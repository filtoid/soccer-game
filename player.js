function Player(){
    this.update = PlayerUpdate;
    this.draw = PlayerDraw;
    this.loc = new Location(365, 500);
    this.size = new Location(15, 8); // Actual size
    // this.size = new Location(25, 12); // Testing size
    this.field = null;

    this.rotation = 0;
    this.speed = 5;

    this.isMoving = false;
    this.delay_feet = 0;
    this.DEFAULT_DELAY = 1;
    this.feet_statuses = ["center", "forward", "center", "backward"];
    this.left_foot_cur_status = 0; 
    this.right_foot_cur_status = 0;

    this.color = "#0000ff";
    this.head_color = "#282824";
    this.skin_tone = "#c6b58b";
}

function PlayerUpdate(field){
    this.field = field;
    this.isMoving = false;
    if(isKeyPressed('D')){
        this.isMoving = true;
        this.rotation = 0.75 * (2*Math.PI);
    }
    if(isKeyPressed('A')){
        this.rotation = 0.25 * (2*Math.PI);
        this.isMoving = true;
    }
    if(isKeyPressed('W')){
        this.isMoving = true;
        this.rotation = 0.5 * (2*Math.PI);
        if(isKeyPressed('A')){
            this.rotation = 0.375 * (2*Math.PI);
        }else if(isKeyPressed('D')){
            this.rotation = 0.625 * (2*Math.PI); 
        }
    }
    if(isKeyPressed('S')){
        this.isMoving = true;
        this.rotation = 0;
        if(isKeyPressed('A')){
            this.rotation = 0.125 * (2*Math.PI);
        }else if(isKeyPressed('D')){
            this.rotation = 0.875 * (2*Math.PI); 
        }
    }
    
    if(this.isMoving){
        // We are moving
        this.loc.x -= this.speed * Math.sin(this.rotation);
        this.loc.y += this.speed * Math.cos(this.rotation);
        
        if(this.delay_feet >  0){
            // Not on this loop
            this.delay_feet -= 1;
        }else{
            // Move the feet and reset the counter
            this.delay_feet = this.DEFAULT_DELAY;
            if(this.left_foot_cur_status == 0 && this.right_foot_cur_status == 0){
                // Moving off so set the initial state
                this.left_foot_cur_status = 1;
                this.right_foot_cur_status = 3;
            }else{
                // We are cycling through the feet statuses
                this.left_foot_cur_status += 1;
                this.right_foot_cur_status += 1;
                if(this.left_foot_cur_status > this.feet_statuses.length){
                    this.left_foot_cur_status = 0;
                }
                if(this.right_foot_cur_status > this.feet_statuses.length){
                    this.right_foot_cur_status = 0;
                }
            }
        }
    }else{
        // We are stood still - center the feet
        this.left_foot_cur_status = 0; 
        this.right_foot_cur_status = 0;
        this.delay_feet = 0;
    }

    // Check bounds of the pitch - can't run into the stands
    if(this.loc.x < 0){
        this.loc.x = 0;
    }
    if(this.loc.x > field.size.x){
        this.loc.x = field.size.x;
    }
    if(this.loc.y< 0){
        this.loc.y = 0;
    }
    if(this.loc.y > field.size.y){
        this.loc.y = field.size.y;
    }
    
    // figure out if we need to alter the field offset based on our location
    if( (field.size.x - this.loc.x) < (field.screen_dim.x/2) ){
        field.offset.x = field.size.x - field.screen_dim.x;
    }else if(this.loc.x > (field.screen_dim.x/2) ){
        field.offset.x = this.loc.x - (field.screen_dim.x/2);
    }
    if( (field.size.y - this.loc.y) < (field.screen_dim.y/2) ){
        field.offset.y = field.size.y - field.screen_dim.y;
    }else if( this.loc.y > (field.screen_dim.y/2) ){
        field.offset.y = this.loc.y - (field.screen_dim.y/2);
    } 
}

function PlayerDraw(ctx){
    ctx.strokeStyle = "#000000";

    var draw_x = this.loc.x;
    if( (field.size.x - this.loc.x) < (field.screen_dim.x/2) ){
        draw_x = field.screen_dim.x  - (field.size.x - this.loc.x);
    }else if(this.loc.x > (this.field.screen_dim.x /2)){
        draw_x =  (this.field.screen_dim.x /2);
    }
    
    var draw_y = this.loc.y;
    if( (field.size.y - this.loc.y) < (field.screen_dim.y/2) ){
        draw_y = field.screen_dim.y  - (field.size.y - this.loc.y);
    }else if(this.loc.y > (this.field.screen_dim.y /2)){
        draw_y =  (this.field.screen_dim.y /2);
    }
    
    // Draw Feet - left foot
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    var feet_offset = this.size.x/2;
    var nudge_amount = 0; // this.size.y * 0.65;
    var left_foot_status = this.feet_statuses[this.left_foot_cur_status];
    if(left_foot_status == "center"){
        nudge_amount = this.size.y * 0.65;
    }else if(left_foot_status == "forward"){
        nudge_amount = this.size.y * 0.95;
    }else if(left_foot_status == "backward"){
        nudge_amount = 0;
    }
    var new_foot_x = (draw_x - (this.size.x/2)) + (feet_offset * Math.cos(this.rotation)) - (nudge_amount * Math.sin(this.rotation));
    var new_foot_y = (draw_y - (this.size.y/2)) + (feet_offset * Math.sin(this.rotation)) + (nudge_amount * Math.cos(this.rotation));
    var foot_size_x = this.size.y*0.75;
    var foot_size_y = this.size.x/6;
    ctx.ellipse(new_foot_x, new_foot_y, foot_size_x, foot_size_y, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(new_foot_x, new_foot_y, foot_size_x, foot_size_y, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.stroke();

    // Draw Feet - right foot
    ctx.beginPath();
    var right_foot_cur_status = this.feet_statuses[this.right_foot_cur_status];
    if(right_foot_cur_status == "center"){
        nudge_amount = this.size.y * 0.65;
    }else if(right_foot_cur_status == "forward"){
        nudge_amount = this.size.y * 0.95;
    }else if(right_foot_cur_status == "backward"){
        nudge_amount = 0;
    }
    new_foot_x = (draw_x - (this.size.x/2)) - (feet_offset * Math.cos(this.rotation)) - (nudge_amount * Math.sin(this.rotation));
    new_foot_y = (draw_y - (this.size.y/2)) - (feet_offset * Math.sin(this.rotation)) + (nudge_amount * Math.cos(this.rotation));
    ctx.ellipse(new_foot_x, new_foot_y, foot_size_x, foot_size_y, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(new_foot_x, new_foot_y, foot_size_x, foot_size_y, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.stroke();

    // Draw Hands - Left Hand
    ctx.fillStyle = this.skin_tone;
    ctx.beginPath();
    var hand_offset = this.size.x * 0.85;
    var hand_nudge_amount = 0; // this.size.y * 0.65;
    var left_hand_status = this.feet_statuses[this.right_foot_cur_status];
    if(left_hand_status == "center"){
        hand_nudge_amount = this.size.y * 0.50;
    }else if(left_hand_status == "forward"){
        hand_nudge_amount = this.size.y * 0.80;
    }else if(left_hand_status == "backward"){
        hand_nudge_amount = 0;
    }
    var left_hand_x = (draw_x - (this.size.x/2)) + (hand_offset * Math.cos(this.rotation)) - (hand_nudge_amount * Math.sin(this.rotation));
    var left_hand_y = (draw_y - (this.size.y/2)) + (hand_offset * Math.sin(this.rotation)) + (hand_nudge_amount * Math.cos(this.rotation));
    var left_hand_size = this.size.x/5;
    ctx.ellipse(left_hand_x, left_hand_y, left_hand_size, left_hand_size, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(left_hand_x, left_hand_y, left_hand_size, left_hand_size, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.stroke();

    // Draw hand - right hand
    ctx.fillStyle = this.skin_tone;
    ctx.beginPath();
    var right_hand_status = this.feet_statuses[this.left_foot_cur_status];
    if(right_hand_status == "center"){
        hand_nudge_amount = this.size.y * 0.50;
    }else if(right_hand_status == "forward"){
        hand_nudge_amount = this.size.y * 0.80;
    }else if(right_hand_status == "backward"){
        hand_nudge_amount = 0;
    }
    var right_hand_x = (draw_x - (this.size.x/2)) - (hand_offset * Math.cos(this.rotation)) - (hand_nudge_amount * Math.sin(this.rotation));
    var right_hand_y = (draw_y - (this.size.y/2)) - (hand_offset * Math.sin(this.rotation)) + (hand_nudge_amount * Math.cos(this.rotation));
    var right_hand_size = this.size.x/5;
    ctx.ellipse(right_hand_x, right_hand_y, right_hand_size, right_hand_size, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(right_hand_x, right_hand_y, right_hand_size, right_hand_size, this.rotation + (Math.PI/2), 0, 2 * Math.PI);
    ctx.stroke();

    // Draw Body 
    ctx.beginPath();
    ctx.ellipse(draw_x-(this.size.x/2), draw_y - (this.size.y/2), this.size.x, this.size.y, this.rotation, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(draw_x-(this.size.x/2), draw_y - (this.size.y/2), this.size.x, this.size.y, this.rotation, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw the head - offset a bit forward of the body
    ctx.fillStyle = this.head_color;
    ctx.beginPath();
    var offset_amount = (this.size.y/4) - 1;
    var new_x = (draw_x - (this.size.x/2)) - (offset_amount * Math.sin(this.rotation));
    var new_y = (draw_y - (this.size.y/2)) + (offset_amount * Math.cos(this.rotation));
    var head_size = parseInt(this.size.y * 0.75);
    ctx.ellipse(new_x, new_y, head_size, head_size, 0, 0, 2 * Math.PI);
    ctx.fill();


}