# merl.girbshebi

Shuffle letters around in an element when hovered, at a set interval. Returns to original when user stops hovering. 

## Default markup

```HTML
<a href="#" class="js-girbshebi">Example link text</a>
```

## Default settings

|Key|Type|Default|Note|
|---|---|---|---|
|`selector`|`string`|`.js-girshebi`||
|`interval`|`number`|`75`|Update each millisecond.|
|`capitilize`|`boolean`|`false`|Capitilize first letter. All others become lowercase.|
|`width`|`boolean`|`false`|Sets initial width.|
|`attr`|`string`|`data-girbshebi`||

##Init

```javascript
merl.girbshebi.init();
```
## Init with settings

```javascript
merl.girbshebi.init( {
	selector: 'button',
	interval: 150,
} );
```

## Instance settings

```html
<a href="/" class="js-girbshebi" data-girbshebi='{"capitilize":true, "interval":25, "width":true}'>example</a>
```



