;(function(){
	'use strict';

	var wrap = function(CanvasJS){
		// wrap for AMD or browser

		CanvasJS.registerChart('line', function(plotUnit){

			var totalDataSeries = plotUnit.dataSeriesIndexes.length;
			if (totalDataSeries <= 0)
				return;

			var ghostCtx = this._eventManager.ghostCtx;
			//var ghostCtx = this.overlaidCanvasCtx;

			this.ctx.save();

			var plotArea = this.getPlotArea();

			this.ctx.beginPath();
			this.ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
			this.ctx.clip();

			var markers = [];

			for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++){

				var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

				var dataSeries = this.data[dataSeriesIndex];
				this.ctx.lineWidth = dataSeries.lineThickness;
				var dataPoints = dataSeries.dataPoints;

				var seriesId = dataSeries.id;
				this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
				var hexColor = CanvasJS.intToHexColorString(seriesId);
				ghostCtx.strokeStyle = hexColor;
				//ghostCtx.lineWidth = dataSeries.lineThickness;
				ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

				var colorSet = dataSeries._colorSet;
				var color = colorSet[0];
				this.ctx.strokeStyle = color;

				var isFirstDataPointInPlotArea = true;
				var i = 0, x, y;
				var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

				//if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
				//    dataSeries.markerSize = 8;

				if (dataPoints.length > 0){
					//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

					//dataSeries.noDataPointsInPlotArea = 0

					for (i = 0; i < dataPoints.length; i++){

						dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

						if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
							continue;

						//if (!isFinite(dataPoints[i].y))
						//    continue;

						if (typeof (dataPoints[i].y) !== "number")
							continue;

						x = (plotUnit.axisX.convertionParameters.reference + plotUnit.axisX.convertionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.convertionParameters.minimum) + 0.5) << 0;
						y = (plotUnit.axisY.convertionParameters.reference + plotUnit.axisY.convertionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.convertionParameters.minimum) + 0.5) << 0;

						var id = dataSeries.dataPointIds[i];
						this._eventManager.objectMap[id] = { objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


						//dataSeries.noDataPointsInPlotArea++;

						if (isFirstDataPointInPlotArea){
							this.ctx.beginPath();
							this.ctx.moveTo(x, y);

							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);


							isFirstDataPointInPlotArea = false;
						} else {

							this.ctx.lineTo(x, y);
							ghostCtx.lineTo(x, y);

							if (i % 500 === 0){
								this.ctx.stroke();
								this.ctx.beginPath();
								this.ctx.moveTo(x, y);

								ghostCtx.stroke();
								ghostCtx.beginPath();
								ghostCtx.moveTo(x, y);
							}
						}

						//Render Marker
						if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0){

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

						if (dataPoints[i].indexLabel || dataSeries.indexLabel){

							this._indexLabels.push({
								chartType: "line",
								dataPoint: dataPoints[i],
								dataSeries: dataSeries,
								point: { x: x, y: y },
								color: color
							});

						}

					}

					this.ctx.stroke();
					ghostCtx.stroke();
				}
			}


			CanvasJS.RenderHelper.drawMarkers(markers);
			this.ctx.restore();

			this.ctx.beginPath();
			ghostCtx.beginPath();
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