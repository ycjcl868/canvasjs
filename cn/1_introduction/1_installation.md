###安装
---------

####下载CanvasJS库
Zip压缩包中有两种文件：
1. 未压缩过的文件 -- canvasjs.js
2. 压缩过的文件   -- canvasjs.min.js
[下载CanvasJS库](http://canvasjs.com/fdm/chart/)，解压下载的zip文件，把文件放到和html相同的目录下。

####将CanvasJS添加到网页中
将文件引入到网页的标签中  
`canvasjs.js`和`canvasjs.min.js`两个文件任意引一个，然而建议在开发环境下引入`canvasjs.js`文件，生产环境中引入`canvasjs.min.js`文件。  
```
<head>
  <script type="text/javascript" src="canvasjs.min.js"></script>
</head>
```

####测试是否安装成功?
创建一个html文件,将`canvasjs.js`文件和html文件在同一目录下。然后复制下面代码到html文件中
```
<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript" src="canvasjs.min.js"></script>
  <script type="text/javascript">
      window.onload = function () {
          var chart = new CanvasJS.Chart("chartContainer", {
              data: [
              {
                  type: "column",
                  dataPoints: [
                  { x: 10, y: 10 },
                  { x: 20, y: 15 },
                  { x: 30, y: 25 },
                  { x: 40, y: 30 },
                  { x: 50, y: 28 }
                  ]
              }
              ]
          });
 
          chart.render();
      }
  </script>
</head>
 
<body>
  <div id="chartContainer" style="height: 500px; width: 50%;"></div>
</body>
</html>
```
保存文件，然后在浏览器下打开，一个柱状图表就在浏览器中渲染出来了。