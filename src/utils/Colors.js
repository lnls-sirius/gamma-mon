class Color{
    constructor(){
        if(! Color.instance){
            Color.instance = this;
        }

        this.MAJOR_BG = 'rgba(245,213,0,0.8)';
        this.MAJOR_LINE = 'rgba(245,213,0,1)';

        this.OK_BG = 'rgba(65,190,60,0.2)';
        this.OK_LINE = 'rgba(65,190,60,0.6)';

        this.MINOR_BG = 'rgba(359,100,50,0.8)';
        this.MINOR_LINE = 'rgba(359,100,50,1)';

        this.HOVER_LINE = '#FFFFFF';

        return Color.this;
    }
}

const instance = new Color();
Object.freeze(instance);

export {instance as color};
