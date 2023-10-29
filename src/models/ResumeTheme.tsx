import { makeAutoObservable } from "mobx";

class ResumeTheme {
    name: string;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    font_family: string;
    font_size: number;
    text_color: string;
    background_color: string;
    height: number;
    width: number;
    uuid: string;

    constructor(){
        this.name = "Default Theme";
        this.margin = {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1
          };
        this.text_color = "#000000";
        this.background_color = "#FFFFFF";
        this.font_family = "Times New Roman";
        this.font_size = 12;
          /*
            A4 size
            11.7in x 8.3in
        
            Letter Size
            11in x 8.5in
          */
        this.height = 11;
        this.width = 8.5;
        
        // Generate a new UUID for this theme
        this.uuid = crypto.randomUUID();

        makeAutoObservable(this);
    }

    load(input: ResumeTheme) {
      this.uuid = input.uuid;
      this.height = input.height;
      this.width = input.width;
      this.font_size = input.font_size;
      this.font_family = input.font_family;
      this.background_color = input.background_color;
      this.text_color = input.text_color;
      this.margin = input.margin;
      this.name = input.name;
    }
}

export default ResumeTheme;