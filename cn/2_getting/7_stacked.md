###堆积图
-------

####概述 - 堆积图
堆积图是在一个图表中表示多个类似数据集的多系列图表，堆积图有两种类型：
Stacked charts display the contribution of each individual series at any given point.
1. 叠图表： 数据点被堆叠在其它类型的上方，堆积图显示出每个单独系列点的作用。同时也支持堆栈图stackedArea，stackedColumn，stackedBar
2. 叠图表100%：每个系列的数据点被堆叠在彼此的顶部，加起来为100%。每个系列表示了在总共百分比的所占比例。支持堆叠100％图表有stackedArea100，stackedColumn100，stackedBar100。
饼图和圆环图不能与任何其他图表类型组合。
**注意：当绘制堆积图，所有的dataSeries应该是同一类型。**

####简单堆积图
在下面的例子中，我们将绘制一个简单的stackedArea图。编辑代码绘制“stackedColumn”和“stackedBar”图。
```
<!DOCTYPE HTML>
<html>
<head>  
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "A Stacked Area Chart"
      
      },   
      data: [{        
        type: "stackedArea", //or stackedColumn
        dataPoints: [
        { x: 10, y: 171 },
        { x: 20, y: 155},
        { x: 30, y: 150 },
        { x: 40, y: 165 },
        { x: 50, y: 195 },
        { x: 60, y: 168 },
        { x: 70, y: 128 },
        { x: 80, y: 134 },
        { x: 90, y: 114}
        ]
      },{        
        type: "stackedArea", //or stackedColumn
        dataPoints: [
        { x: 10, y: 101 },
        { x: 20, y: 105},
        { x: 30, y: 100 },
        { x: 40, y: 105 },
        { x: 50, y: 105 },
        { x: 60, y: 108 },
        { x: 70, y: 108 },
        { x: 80, y: 104 },
        { x: 90, y: 104}
        ]
      }
      ]
    });

    chart.render();
  }
  </script>
  <script type="text/javascript" src="/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](http://7xi72v.com1.z0.glb.clouddn.com/canvasjs%2FQQ20160427-3%402x.png)

####堆积图100％
不同之处在于它们都呈现为100。％的100％的堆积图是类似于上述堆叠图表 
下面是“stackedColumn100”的一个例子。这里，每列的总长度为100个单位，每个数据点的长度是它的贡献百分比至总量。 
修改图表创建，“stackedArea100”，“stackedBar100”图表。
```
<!DOCTYPE HTML>
<html>
<head>  
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "A 100 Percent Stacked Chart"      
      },   
      data: [{        
        type: "stackedColumn100", //or stackedArea100
        dataPoints: [
        { x: 10, y: 171 },
        { x: 20, y: 155},
        { x: 30, y: 150 },
        { x: 40, y: 165 },
        { x: 50, y: 195 },
        { x: 60, y: 168 },
        { x: 70, y: 128 },
        { x: 80, y: 134 },
        { x: 90, y: 114}
        ]
      },{        
        type: "stackedColumn100", //or stackedArea100
        dataPoints: [
        { x: 10, y: 81 },
        { x: 20, y: 74},
        { x: 30, y: 60 },
        { x: 40, y: 145 },
        { x: 50, y: 85 },
        { x: 60, y: 08 },
        { x: 70, y: 18 },
        { x: 80, y: 104 },
        { x: 90, y: 204}
        ]
      }
      ]
    });

    chart.render();
  }
  </script>
  <script type="text/javascript" src="/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](http://7xi72v.com1.z0.glb.clouddn.com/canvasjs%2FQQ20160427-0%402x.png)


####总结
使用上面的概念，我们可以画出一个完整的图如下图所示。 
需要注意的是，我们通过showInLegend属性设置为true启用传奇。您将了解更多关于联想在即将到来的章节。
```
<!DOCTYPE HTML>
<html>
<head>  
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
      text: "Evening Sales"
      },
      axisX: {
        valueFormatString: "MMMM",
        interval: 1,
        intervalType: "month"
      
      },
      data: [
      {        
        type: "stackedColumn",
        legendText: "meals",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }
        
        ]
      },
        {        
        type: "stackedColumn",
        legendText: "snacks",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }
        
        ]
      },
        {        
        type: "stackedColumn",
        legendText: "Drinks",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }
        
        ]
      },
        
        {        
        type: "stackedColumn",
        legendText: "dessert",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 61 },
        { x: new Date(2012, 02, 1), y: 75},
        { x: new Date(2012, 03, 1), y: 80 },
        { x: new Date(2012, 04, 1), y: 85 },
        { x: new Date(2012, 05, 1), y: 105 }
        
        ]
      },
        {        
        type: "stackedColumn",
        legendText: "pick-ups",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 20 },
        { x: new Date(2012, 02, 1), y: 35},
        { x: new Date(2012, 03, 1), y: 30 },
        { x: new Date(2012, 04, 1), y: 45 },
        { x: new Date(2012, 05, 1), y: 25 }
        
        ]
      }
        
      ]
    });

    chart.render();
  }
  </script>
 <script type="text/javascript" src="/assets/script/canvasjs.min.js"></script></head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](http://7xi72v.com1.z0.glb.clouddn.com/canvasjs%2FQQ20160427-1%402x.png)