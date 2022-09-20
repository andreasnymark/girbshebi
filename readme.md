# Girbshebi

Shuffle letters around in an hovered element. At a set interval. Returns to original text when user stops hovering.

## Default markup

```HTML
<a href="#" class="giberish">Example link text</a>
```

```javascript
import { Girbshebi } from './girbshebi.js';

let nav = document.querySelectorAll( '.giberish' );
nav.forEach( ( elem ) => {
	new Girbshebi( elem, { interval: 10, capitilize: true } );
})

```

## Settings

|Key|Type|Default|Note|
|---|---|---|---|
|`interval`|`number`|`75`|Shuffle text interval. Lower number, more frequent shuffle. |
|`capitilize`|`boolean`|`false`|Capitilize first letter. All others become lowercase.|
|`width`|`boolean`|`true`|Sets initial width using inline style. `width:NNNpx` and `overflow:visible` |

## Init

```javascript
new Girbshebi( elem );
```

## Init with settings

```javascript
new Girbshebi( elem, {
	interval: 150,
	capitilize: true,
	width: false
} );
```




