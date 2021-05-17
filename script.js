let earr = []
let nang = 0
function setup()
{
    createCanvas(windowWidth,windowHeight)
    angleMode(DEGREES)
    earr[0] = new Electron(15, 190, 50, 0, 0, 1.5, "blue")
    earr[1] = new Electron(20, 150, 300, 270, 0, 3, "green")
    earr[2] = new Electron(17, 100, 170, 180, 0, 1, "red")
    earr[3] = new Electron(13, 80, 220, 100, -45, 1.8, "pink")
    earr[4] = new Electron(13, 80, 220, 100, 45, 2.3, "orange")
    
    //frameRate(1)
}
function draw()
{
    background(0)
    
    push()
    translate(width/2,height/2)
    rotate(nang)
    nucleus()
    pop()
    nang+=1
    
    for(let i=0;i<earr.length;i++)
    {
        push()
        translate(width/2,height/2)
        earr[i].sketch()
        pop()
        
        earr[i].inc()
        earr[i].update()
    }
}
class Electron
{
    constructor(r,min,maj,ang,rot,v,c)
    {
        this.x = 0
        this.y = 0
        
        this.major = maj
        this.minor = min
        this.angle = ang
        this.rotation = rot
        
        this.velocity = v
        this.r = r 
        this.col = c
        
        this.history = []
        
        this.update()
    }
    sketch()
    {
        noStroke();
        for(let i=0;i<this.history.length;i++)
        {
            let c = color(this.col)
            c.setAlpha(255 * i*10/100)
            fill(c)
            let rtemp = this.r * i*10/100
            ellipse(this.history[i][0], this.history[i][1], rtemp, rtemp)
        }
    
        noStroke;
        fill(this.col)
        ellipse(this.x,this.y,this.r,this.r)
    }
    inc()
    {
        this.angle = (this.angle + this.velocity)%360
    }
    update()
    {
        let rad = (this.major*this.minor)/sqrt(pow(this.major,2) * pow(sin(this.angle),2) + pow(this.minor,2) * pow(cos(this.angle),2))
        
        let tx = rad * sin(this.angle)
        let ty = rad * -cos(this.angle)
        
        this.x = (cos(this.rotation)*tx) + (-sin(this.rotation)*ty)
        this.y = (sin(this.rotation)*tx) + (cos(this.rotation)*ty)
        
        this.history.push([this.x,this.y])
        if(this.history.length>10)
        {
            this.history.shift()
        }
    }
}

function nucleus()
{
    fill("purple")
    circle(15,-10,20)
    circle(-15,-10,20)
    circle(0,17,20)
    
    fill("white")
    circle(0,-17,20)
    circle(15,8,20)
    circle(-15,8,20)
    
    fill("purple")
    circle(0,0,20)
}