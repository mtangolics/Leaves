function Leaves() {}

Leaves.prototype = {};

function initLeaves() {
    var leaves = new Leaves();
    leaves.init();
}

Leaves.prototype.init = function()
{
    /* Get a reference to the element that will contain the leaves */
    var container = $("#leafContainer");
    var height = $(window).height();
    var width = $(window).width();
    $("#container").height(height);
    /* Fill the empty container with new leaves */
    var self = this;

    $.get("images/leaf.svg", function(data) {

        for (var i = 0; i < Math.round(width/50); i++) 
        {
            container.append(self.createALeaf(data));
        }
        var badger = $("<img>");
        badger.attr("src","images/badger.svg");
        container.append(badger);
        
    }, "text");
}

Leaves.prototype.createALeaf = function(imageData)
{
    var DEAD_COLORS = ["#61380B","FBCC0D", "#FF8000", "#B40404"];
    var leafDiv = $("<div>");
    var image = $("<div>");
    
    var width = $("#container").width();
    var fadeAndDropDuration = Math.round(this.randomFloat(5, 11));
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    var spinDuration = Math.round(this.randomFloat(4, 8));
    var leafDelay = Math.round(this.randomFloat(0, 8));
    var color = DEAD_COLORS[this.randomInteger(0,4)];
    
    imageData = imageData.replace("\{beg\}", leafDelay + "s");
    imageData = imageData.replace("\{color\}", color);
    image.html(imageData);

    leafDiv.css({
        "top":"-100px", 
        "left" : this.randomInteger(0, width) + "px", 
        "-webkit-animation-name" : "fade, dropAndRotate",
        "-webkit-animation-duration" : "10s,10s",
        "-webkit-animation-delay" : (leafDelay + "s, " + leafDelay + "s")
    });

    
    image.css({
        "-webkit-animation-name" : spinAnimationName,
        "-webkit-animation-duration" : spinDuration + "s"
    })

    leafDiv.append(image);

    return leafDiv;
}


Leaves.prototype.randomInteger = function(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}

Leaves.prototype.randomFloat = function(low, high)
{
    return low + Math.random() * (high - low);
}


$(document).ready(function() { initLeaves(); });
