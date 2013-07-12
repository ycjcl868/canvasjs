;(function(){
	'use strict';

	function compareNumbers(a, b){
		return a - b;
	}

	var wrap = function(CanvasJS){
		// wrap for AMD or browser

		CanvasJS.registerChart('stackedArea', function(plotUnit){
			var point;
			var id;
			var dataPoints;
			var dataSeries;
			var dataSeriesIndex;
			var totalDataSeries = plotUnit.dataSeriesIndexes.length;

			if (totalDataSeries <= 0)
				return;

			var color = null;
			var markers = [];

			var plotArea = this.getPlotArea();

			var offsetY = [];

			var allXValues = [];
			//var offsetNegativeY = [];

			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

			//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + 0.5) << 0;
			var yZeroToPixel = (plotUnit.axisY.convertionParameters.reference + plotUnit.axisY.convertionParameters.pixelPerUnit * (0 - plotUnit.axisY.convertionParameters.minimum)) << 0;

			// var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

			var ghostCtx = this._eventManager.ghostCtx;
			ghostCtx.beginPath();

			this.ctx.save();
			ghostCtx.save();

			this.ctx.beginPath();
			this.ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this.ctx.clip();

			ghostCtx.beginPath();
			ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			ghostCtx.clip();

			var xValuePresent = [];
			for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++){

				dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
				dataSeries = this.data[dataSeriesIndex];
				dataPoints = dataSeries.dataPoints;
				var xValue;

				dataSeries.dataPointIndexes = [];

				for (i = 0; i < dataPoints.length; i++){
					xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
					dataSeries.dataPointIndexes[xValue] = i;

					if (!xValuePresent[xValue]){
						allXValues.push(xValue);
						xValuePresent[xValue] = true;
					}
				}

				allXValues.sort(compareNumbers);
			}

			for (j = 0; j < plotUnit.dataSeriesIndexes.length; j++){

				dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

				dataSeries = this.data[dataSeriesIndex];
				dataPoints = dataSeries.dataPoints;
				var isFirstDataPointInPlotArea = true;

				var currentBaseValues = [];


				var seriesId = dataSeries.id;
				this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
				var hexColor = CanvasJS.intToHexColorString(seriesId);
				ghostCtx.fillStyle = hexColor;


				if (allXValues.length > 0){

					color = dataSeries._colorSet[0];
					//this.ctx.strokeStyle = "red";
					this.ctx.fillStyle = color;

					for (i = 0; i < allXValues.length; i++){

						dataPointX = allXValues[i];
						var dataPoint = null;

						if (dataSeries.dataPointIndexes[dataPointX] >= 0)
							dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
						else
							dataPoint = { x: dataPointX, y: 0 };

						if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax){
							continue;
						}

						if (typeof (dataPoint.y) !== "number")
							continue;

						x = (plotUnit.axisX.convertionParameters.reference + plotUnit.axisX.convertionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.convertionParameters.minimum) + 0.5) << 0;
						y = (plotUnit.axisY.convertionParameters.reference + plotUnit.axisY.convertionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.convertionParameters.minimum) + 0.5) << 0;

						var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

						y = y - offset;
						currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
						offsetY[dataPointX] = yZeroToPixel - y;

						if (isFirstDataPointInPlotArea){
							this.ctx.beginPath();
							this.ctx.moveTo(x, y);

							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);

							isFirstDataPointInPlotArea = false;
						}
						else {

							this.ctx.lineTo(x, y);
							ghostCtx.lineTo(x, y);

							if (i % 250 === 0){

								while (currentBaseValues.length > 0){
									point = currentBaseValues.pop();
									this.ctx.lineTo(point.x, point.y);
									ghostCtx.lineTo(point.x, point.y);

								}

								this.ctx.closePath();
								this.ctx.fill();

								this.ctx.beginPath();
								this.ctx.moveTo(x, y);

								ghostCtx.closePath();
								ghostCtx.fill();

								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);

								currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
							}

						}

						if (dataSeries.dataPointIndexes[dataPointX] >= 0){
							id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
							this._eventManager.objectMap[id] = { objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y };
						}

						//Render Marker
						if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0){
							if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0){

								var markerProps = dataSeries.getMarkerProperties(i, x, y, this.ctx);
								markers.push(markerProps);

								var markerColor = CanvasJS.intToHexColorString(id);
								markers.push({
									x: x, y: y, ctx: ghostCtx,
									type: markerProps.type,
									size: markerProps.size,
									color: markerColor,
									borderColor: markerColor,
									borderThickness: markerProps.borderThickness
								});
							}
						}

						if (dataPoint.indexLabel || dataSeries.indexLabel){

							this._indexLabels.push({
								chartType: "stackedArea",
								dataPoint: dataPoint,
								dataSeries: dataSeries,
								point: { x: x, y: y },
								color: color
							});

						}
					}

					while (currentBaseValues.length > 0){
						point = currentBaseValues.pop();
						this.ctx.lineTo(point.x, point.y);
						ghostCtx.lineTo(point.x, point.y);
					}

					this.ctx.closePath();
					this.ctx.fill();
					this.ctx.beginPath();
					this.ctx.moveTo(x, y);

					ghostCtx.closePath();
					ghostCtx.fill();
					ghostCtx.beginPath();
					ghostCtx.moveTo(x, y);
				}

				delete (dataSeries.dataPointIndexes);
			}

			CanvasJS.RenderHelper.drawMarkers(markers);


			this.ctx.restore();
			ghostCtx.restore();
		});

		return CanvasJS;
	}; // end wrap

	// wrap up
	if (typeof define === 'function' && define.amd){
		// returns an empty module
		define(['../canvasjs'], wrap);
	}
	else {
		return wrap(this.CanvasJS);
	}

}.call(this));