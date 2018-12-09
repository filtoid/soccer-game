function Field(_screen_width, _screen_height){
    this.screen_dim = new Location(_screen_width, _screen_height);
    this.size = new Location(730, 1000);

    this.offset = new Location(0,0);

    this.update = FieldUpdate;
    this.draw = FieldDraw;
}

function FieldUpdate(){

}

function FieldDraw(ctx){
    // Centre circle
    ctx.beginPath();
    ctx.arc( (this.size.x/2) - this.offset.x, (this.size.y/2) - this.offset.y, 50, 0 , 2*Math.PI);
    ctx.moveTo(0 - this.offset.x, (this.size.y/2)-this.offset.y);
    ctx.lineTo(this.size.x - this.offset.x, (this.size.y/2)-this.offset.y);
    ctx.stroke();



}