# merl.girbshebi

Shuffle letters around in an element when hovered, at a set interval. Returns to original when blurred. 

## Default markup

```HTML
<a href="example" class="js-girbshebi">Example</a>
```

## Default settings

|Key|Type|Default|Note|
|---|---|---|---|
|`selector`|`string`|`.js-girshebi`||
|`interval`|`number`|`75`|Update each millisecond.|

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

