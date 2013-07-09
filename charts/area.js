define(function(require){
	'use strict';

	var CanvasJS = require('./../canvasjs');

	CanvasJS.registerChart('area', function(plotUnit){
		var totalDataSeries = plotUnit.dataSeriesIndexes.length;

		if (totalDataSeries <= 0)
			return;

		var ghostCtx = this._eventManager.ghostCtx;

		var axisXProps = plotUnit.axisX.lineCoordinates;
		var axisYProps = plotUnit.axisY.lineCoordinates;
		var markers = [];

		var plotArea = this.getPlotArea();
		this.ctx.save();
		ghostCtx.save();

		this.ctx.beginPath();
		this.ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		this.ctx.clip();

		ghostCtx.beginPath();
		ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ghostCtx.clip();

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++){

			var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

			var dataSeries = this.data[dataSeriesIndex];

			var dataPoints = dataSeries.dataPoints;

			var seriesId = dataSeries.id;
			this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

			var hexColor = CanvasJS.intToHexColorString(seriesId);
			ghostCtx.fillStyle = hexColor;
			//ghostCtx.lineWidth = dataSeries.lineThickness;
			//ghostCtx.lineWidth = 20;

			markers = [];

			var isFirstDataPointInPlotArea = true;
			var i = 0, x, y;
			var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

			var yZeroToPixel = (plotUnit.axisY.convertionParameters.reference + plotUnit.axisY.convertionParameters.pixelPerUnit * (0 - plotUnit.axisY.convertionParameters.minimum) + 0.5) << 0;
			var baseY;

			var startPoint = null;

			if (dataPoints.length > 0){
				//this.ctx.strokeStyle = "#4572A7 ";
				var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
				//this.ctx.strokeStyle = "red";
				this.ctx.fillStyle = color;

				for (; i < dataPoints.length; i++){

					dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

					if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax){
						continue;
					}

					x = (plotUnit.axisX.convertionParameters.reference + plotUnit.axisX.convertionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.convertionParameters.minimum) + 0.5) << 0;
					y = (plotUnit.axisY.convertionParameters.reference + plotUnit.axisY.convertionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.convertionParameters.minimum) + 0.5) << 0;

					if (typeof (dataPoints[i].y) !== "number")
						continue;

					if (isFirstDataPointInPlotArea){
						this.ctx.beginPath();
						this.ctx.moveTo(x, y);
						startPoint = { x: x, y: y };

						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y);

						isFirstDataPointInPlotArea = false;
					}
					else {

						this.ctx.lineTo(x, y);
						ghostCtx.lineTo(x, y);

						if (i % 250 === 0){

							if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0){
								baseY = yZeroToPixel;
							}
							else if (plotUnit.axisY.maximum < 0)
								baseY = axisYProps.y1;
							else if (plotUnit.axisY.minimum > 0)
								baseY = axisXProps.y2;

							this.ctx.lineTo(x, baseY);
							this.ctx.lineTo(startPoint.x, baseY);
							this.ctx.closePath();
							this.ctx.fill();
							this.ctx.beginPath();
							this.ctx.moveTo(x, y);


							ghostCtx.lineTo(x, baseY);
							ghostCtx.lineTo(startPoint.x, baseY);
							ghostCtx.closePath();
							ghostCtx.fill();
							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);

							startPoint = { x: x, y: y };
						}
					}


					var id = dataSeries.dataPointIds[i];
					this._eventManager.objectMap[id] = { objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

					//Render Marker
					if (dataPoints[i].markerSize !== 0){
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
					}

					if (dataPoints[i].indexLabel || dataSeries.indexLabel){

						this._indexLabels.push({
							chartType: "area",
							dataPoint: dataPoints[i],
							dataSeries: dataSeries,
							point: { x: x, y: y },
							color: color
						});

					}
				}

				if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0){
					baseY = yZeroToPixel;
				}
				else if (plotUnit.axisY.maximum < 0)
					baseY = axisYProps.y1;
				else if (plotUnit.axisY.minimum > 0)
					baseY = axisXProps.y2;

				this.ctx.lineTo(x, baseY);
				this.ctx.lineTo(startPoint.x, baseY);
				this.ctx.closePath();
				this.ctx.fill();


				ghostCtx.lineTo(x, baseY);
				ghostCtx.lineTo(startPoint.x, baseY);
				ghostCtx.closePath();
				ghostCtx.fill();

				startPoint = { x: x, y: y };
				CanvasJS.RenderHelper.drawMarkers(markers);
			}
		}

		this.ctx.restore();
		this._eventManager.ghostCtx.restore();

	});

	return CanvasJS;
});