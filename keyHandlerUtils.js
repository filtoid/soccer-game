var aryCurPressedKeys = new Array();

function onKeyDown(evt)
{
	//alert(String.fromCharCode(evt.which||evt.keyCode));
	var key=String.fromCharCode(evt.which||evt.keyCode);
    // If key not already down then add to our list
	if(!isKeyPressed(key)){
		aryCurPressedKeys[aryCurPressedKeys.length]=key;
	}
}

function onKeyUp(evt)
{
	var key=String.fromCharCode(evt.which||evt.keyCode);
	// console.log(key);
//alert(key);
    // If the key released is in our list then remove it
	for(var i=0;i<aryCurPressedKeys.length;i++){
		if(key==aryCurPressedKeys[i]){
			removeArrayItem(aryCurPressedKeys,i);
		}
	}
}

function isKeyPressed(key){
	for(var i=0;i<aryCurPressedKeys.length;i++){
		if(aryCurPressedKeys[i]==key){
			return true;
		}
	}
	
	return false;
}

//Move all items in the array above the point down and then
//delete the last item.
function removeArrayItem(_array,nItem){
	for(var i=nItem;i<_array.length;i++){
		_array[i]=_array[i+1];
		
		if(i==_array.length-1){
			delete _array[_array.length];
			return;
		}
	}
}

function removeAllKeysFromArray(){
	aryCurPressedKeys = new Array();
}	