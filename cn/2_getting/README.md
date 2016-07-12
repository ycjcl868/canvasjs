###快速入门
-------
####快速开始：5分钟内创建您的第一个图表
```
<!DOCTYPE HTML>
<html>
<head>
<script src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
<script type="text/javascript">

window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        title:{
            text: "My First Chart in CanvasJS"              
        },
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "apple",  y: 10  },
                { label: "orange", y: 15  },
                { label: "banana", y: 25  },
                { label: "mango",  y: 30  },
                { label: "grape",  y: 28  }
            ]
        }
        ]
    });
    chart.render();
}
</script>
</head>
<body>
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
</body>
</html>
```
![](../canvasjs%2F1.png)
准备好了用canvasJS在您本地创建第一个图表了吗？
上面的代码模板可用于创建多种类型的图表。请按照以下步骤快速开始吧。
1. 复制上面的代码模板，并在本地保存为HTML文件
2. 运行保存的HTML文件，你会看到图表在您的电脑上运行着。
3. 现在改变类型参数为"doughnut"(圆环图)。
4. 保存更改并重新运行。 看！你创建了一个圆环图。 
5. 现在，请尝试更改类型其他各种图表类型，如“splineArea”，“bar”，等等，让CanvasJS发挥出它的强大力量吧。

很容易的，对不对？ 下一步：通过本教程下面去，开始使用CanvasJS轻松地构建不可思议的高性能图表吧。在交互式图表案例的帮助下，教你创建HTML5、Javascript图表的基础知识。 

**我们鼓励您在注释中的描述编辑代码，并与API熟悉。**

----------

####基本柱形图
将以下表格数据，以柱形图的形式呈现出来。

|  水果  |    在一季度销量(万美元） |
| ------ |:------------------------:|
|  香蕉  |            18            |
|   橙   |            29            |
|  苹果  |            40            |
|  芒果  |            34            |
|  葡萄  |            24            |

最基本的柱形图是怎样的？这有一些重要的事项：
1. 实例化一个`Chart`对象，并将`div`元素的`ID`值传入。您也可以通过`DOM 元素`，而不是`ID`值。
2. 通过图表相关的`options`选项，构造第二个参数。 
3. 执行`chart.render()`方法来渲染出图表  

`options`选项中，主要包含4个重要的参数：
1. `title`与`text`的设置
2. `dataPoints`，一个去呈现所有数据的数组
3. `dataSeries` - 是`dataPoints`的父级，也可以设置一系列图表属性。
4. `data` - 一个数组元素用于容纳一个或多个`dataSeries`对象

检查一下以下的代码 - 动手实验一下，让自己更加熟悉相关的API
**注意**
虽然我们使用柱形图来学习各种概念，但应该很容易通过这一个图表去学会其它类型的图表！只是`dataSeries`的`type`属性更改为你需要的图表类型 - `bar条形图`，`area区域`，`line线性图`，`scatter散点图`，`stackedColum`等。
可以试下所有支持的图表类型
```
<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {

      title:{
        text: "Fruits sold in First Quarter"              
      },
      data: [//array of dataSeries              
        { //dataSeries object

         /*** Change type "column" to "bar", "area", "line" or "pie"***/
         type: "column",
         dataPoints: [
         { label: "banana", y: 18 },
         { label: "orange", y: 29 },
         { label: "apple", y: 40 },                                    
         { label: "mango", y: 34 },
         { label: "grape", y: 24 }
         ]
       }
       ]
     });

    chart.render();
  }
  </script>
  <script type="text/javascript" src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](../canvasjs%2F2.png)

####多种类柱形图
如果你想说比较在今年第一和第二季度的各种水果的销量，你需要添加更多的`dataSeries`（和第二季度的值）的数组。下面是如何可以做到。

|  水果  |    在一季度销量(万美元） |    在二季度销量(万美元） |
| ------ |:------------------------:|:------------------------:|
|  香蕉  |            18            |            23            |
|   橙   |            29            |            33            |
|  苹果  |            40            |            48            |
|  芒果  |            34            |            37            |
|  葡萄  |            24            |            20            |

```
<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {            
      title:{
        text: "Fruits sold in First & Second Quarter"              
      },

      data: [  //array of dataSeries     
      { //dataSeries - first quarter
   /*** Change type "column" to "bar", "area", "line" or "pie"***/        
       type: "column",
       name: "First Quarter",
       dataPoints: [
       { label: "banana", y: 18 },
       { label: "orange", y: 29 },
       { label: "apple", y: 40 },                                    
       { label: "mango", y: 34 },
       { label: "grape", y: 24 }
       ]
     },
     { //dataSeries - second quarter

      type: "column",
      name: "Second Quarter",                
      dataPoints: [
      { label: "banana", y: 23 },
      { label: "orange", y: 33 },
      { label: "apple", y: 48 },                                    
      { label: "mango", y: 37 },
      { label: "grape", y: 20 }
      ]
    }
    ]
  });

    chart.render();
  }
  </script>
  <script type="text/javascript" src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](../canvasjs%2F3.png)

--------
####自定义图
在上图中我们可以做一组个性化的数据图表去提高数据可视化  
1. `$前缀`和`K后缀`之间的为y轴的显示值
2. 显示的示例将说明Q1图和Q2图

添加前缀和后缀的值是相当简单的。您可以通过添加前缀和后缀的属性设置值到axisY对象中。
可以将`dataSeries`中的`showInLegend`的值为`true`去显示哪个颜色块代表哪列数据
```
<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {            
      title:{
        text: "Fruits sold in First & Second Quarter"              
      },

      data: [  //array of dataSeries     
      { //dataSeries - first quarter
 /*** Change type "column" to "bar", "area", "line" or "pie"***/        
       type: "column",
       name: "First Quarter",
       showInLegend: true,
       dataPoints: [
       { label: "banana", y: 18 },
       { label: "orange", y: 29 },
       { label: "apple", y: 40 },                                    
       { label: "mango", y: 34 },
       { label: "grape", y: 24 }
       ]
     },

     { //dataSeries - second quarter

      type: "column",
      name: "Second Quarter", 
      showInLegend: true,               
      dataPoints: [
      { label: "banana", y: 23 },
      { label: "orange", y: 33 },
      { label: "apple", y: 48 },                                    
      { label: "mango", y: 37 },
      { label: "grape", y: 20 }
      ]
    }
    ],
 /** Set axisY properties here*/
    axisY:{
      prefix: "$",
      suffix: "K"
    }    
  });

chart.render();
}
</script>
<script type="text/javascript" src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](../canvasjs%2F4.png)
---------
####更改图表主题
canvasJS有自带的主题是改变它的外表和图表-像`theme1`，`theme2`，`theme3`。
您可以通过设置更改主题，下面是一个例子：
```
<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript">
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {

      theme: "theme2",
            
      title:{
        text: "Fruits sold in First & Second Quarter"              
      },

      data: [  //array of dataSeries     
      { //dataSeries - first quarter
 /*** Change type "column" to "bar", "area", "line" or "pie"***/        
       type: "column",
       name: "First Quarter",
       showInLegend: true,
       dataPoints: [
       { label: "banana", y: 18 },
       { label: "orange", y: 29 },
       { label: "apple", y: 40 },                                    
       { label: "mango", y: 34 },
       { label: "grape", y: 24 }
       ]
     },

     { //dataSeries - second quarter

      type: "column",
      name: "Second Quarter", 
      showInLegend: true,               
      dataPoints: [
      { label: "banana", y: 23 },
      { label: "orange", y: 33 },
      { label: "apple", y: 48 },                                    
      { label: "mango", y: 37 },
      { label: "grape", y: 20 }
      ]
    }
    ],
 /** Set axisY properties here*/
    axisY:{
      prefix: "$",
      suffix: "K"
    }    
  });

chart.render();
}
</script>
<script type="text/javascript" src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body>
</html>
```
![](../canvasjs%2F5.png)

-------
####设置/更新数据的另一种方法
上面的例子展示了怎样实例化一个图表对象时传数据到构造函数，创建对象后设置相关`option`可能会更容易。
传递给构造方法的选项​​对象可以通过图表选项属性来访问。使用各种属性相同的对象您可以设置或更新图表。
```
chart.options.title.text = "Chart Title";
chart.options.data = [array];
chart.options.data[0] = {object};
chart.options.data[0].dataPoints = [array];
```
```
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer");

    chart.options.axisY = { prefix: "$", suffix: "K" };
    chart.options.title = { text: "Fruits sold in First & Second Quarter" };

    var series1 = { //dataSeries - first quarter
        type: "column",
        name: "First Quarter",
        showInLegend: true
    };

    var series2 = { //dataSeries - second quarter
        type: "column",
        name: "Second Quarter",
        showInLegend: true
    };

    chart.options.data = [];
    chart.options.data.push(series1);
    chart.options.data.push(series2);


    series1.dataPoints = [
            { label: "banana", y: 18 },
            { label: "orange", y: 29 },
            { label: "apple", y: 40 },
            { label: "mango", y: 34 },
            { label: "grape", y: 24 }
    ];

    series2.dataPoints = [
        { label: "banana", y: 23 },
        { label: "orange", y: 33 },
        { label: "apple", y: 48 },
        { label: "mango", y: 37 },
        { label: "grape", y: 20 }
    ];

    chart.render();
}
</script>
<script type="text/javascript" src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>

<body>
    <div id="chartContainer" style="height: 300px; width: 100%;">
    </div>
</body>
</html>
```
![](../canvasjs%2F6.png)

--------
**注意**
* 您应该记住在设置/更新完选项值后去调用`chart.render()`方法。
* 我们领略到了canvasjs性能，所以你甚至能每100ms刷新一次图表(或更高频率的刷新) -- 虽然这样的刷新率不会在大多数案例下出现。

---------

####更多的定制
如果你做任何更多的定制，下面是列出重要的对象，并允许你这样做的属性表。不要尝试了上面的图表中的所有这些选项。

|  定制                |           对象           |           属性           |
| -------------------- |:------------------------:|:------------------------:|
|  设置图表标题大小    |          title           |     fontSize - 12,etc    |
|  设置图表标题颜色    |          title           |     fontColor- red,etc   |
|  显示Y轴线           |          axisY           |  lineThickness - 0,etc   |
|  显示值的柱顶部      |          dataSeries      |   indexLabel - {y},etc   |
|  设置X轴标签角       |          axisX           |   labelAngle - 30,etc    |