jQuery Infinite Scroll Plugin
======================

JQuery plugin for ajax-enabled infinite page scroll.
There are a lot of jQuery plugins for infinite page scrolling function.
However none of them matched my needs when I faced the problem.
So this is a very simple plugin which makes ajax call to load more data on the page and gives some basic callbacks like data loading started or data did loaded.

##Usage sample

CoffeScript:
```coffee-script
$ ->
	$('#tasks').infiniteScroll
		itemSelector: 'tr.task'
		dataPath: '/tasks/load_more_tasks'
```
HTML part:
			
```html:	
<table id='tasks'>
	<thead>
		<th>ID</th>
		<th>Name</th>
	</thead>
	<tbody>
		<tr class='task'>
			<td>1</td>
			<td>First</td>
		</tr>
		<tr class='task'>
			<td>2</td>
			<td>Second</td>
		</tr>
		...more rows
	</tbody>
</table>
```    
AJAX part: `/tasks/load_more_tasks`. This should return plain HTML:

```html:
<tr class='task'>
	<td>10</td>
	<td>Tenth</td>
</tr>
<tr class='task'>
	<td>21</td>
	<td>Eleventh</td>
</tr>
...even more rows
```
## Options
**dataPath** - URL to load more data from

**itemSelector** - single item selector for data items initially loaded and loaded via AJAX

**onDataLoading** - callback function. Called when more data items should be loaded. Has single parameter supplied - page number

**onDataLoaded** - callback function. Called when additional data items were loaded. Has single parameter supplied - page number

**onDataError** - callback function. Called when there was an error loading data trough AJAX. Has single parameter supplied - page number
