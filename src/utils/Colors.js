class Color{
    constructor(){
        if(! Color.instance){
            Color.instance = this;
        }

        this.MAJOR_BG = 'rgba(245,0,0,0.8)';
        this.MAJOR_LINE = 'rgba(245,0,0,1)';

        this.OK_BG = 'rgba(65,190,60,0.9)';
        this.OK_LINE = 'rgba(65,190,60,0.6)';

        this.OK_GAMMA_BG = 'rgba(148, 79, 24,0.9)';
        this.OK_GAMMA_LINE = 'rgba(148, 79, 24,0.6)';

        this.MINOR_BG = 'rgba(359, 200, 0, 0.8)';
        this.MINOR_LINE = 'rgba(359 ,200, 0, 1)';

        this.INVALID_BG = 'rgba(255, 0, 183, 0.8)'
        this.INVALID_LINE = 'rgba(255, 0, 183, 1)'

        this.HOVER_LINE = '#FFFFFF';

        return Color.this;
    }
}

const instance = new Color();
Object.freeze(instance);

export {instance as color};
