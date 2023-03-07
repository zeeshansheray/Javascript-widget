export class Widget {
    constructor({ position = 'bottom-right'}) {
        this.position = this.getPosition(position);
        this.open = false;
        this.initialise();
        this.createStyles();
        this.GiftIcon     = window.location.origin + '/assets/gift.svg';
        this.StarIcon     = window.location.origin + '/assets/star.svg';
        this.brandDetails = document.currentScript.getAttribute('brand').split('&')
    }

    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px',
        };
    }
    
    initialise() {

        console.log('window ', document.currentScript)

        console.log('script Url ', document.currentScript.getAttribute('brand'))

        var brandDetails = document.currentScript.getAttribute('brand').split('&');
        console.log('details ', brandDetails);

        setTimeout(()=>{
        const container = document.createElement('div');
        container.style.position = 'fixed';
        Object.keys(this.position)
            .forEach(key => container.style[key] = this.position[key]);
        console.log('document ', document.body);
        document.body.appendChild(container);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container')
        buttonContainer.setAttribute("id", "widgetButton")

        const chatIcon = document.createElement('img');
        chatIcon.src = this.brandDetails[1] || 'assets/chat.svg';
        chatIcon.classList.add('icon');
        this.chatIcon = chatIcon;

        const closeIcon = document.createElement('img');
        closeIcon.src = this.brandDetails[1] || 'assets/cross.svg';
        closeIcon.classList.add('icon', 'hidden');
        this.closeIcon = closeIcon;

        buttonContainer.appendChild(this.chatIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener('click', this.toggleOpen.bind(this));

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('hidden', 'message-container');
        
        this.createMessageContainerContent();

        // this.createWidget()

        container.appendChild(this.messageContainer);
        container.appendChild(buttonContainer);
        },3000)
    }


    createMessageContainerContent() {
        this.messageContainer.innerHTML = '';
        var main = document.createElement('div')
        main.innerHTML = this.createWidget()
        this.messageContainer.appendChild(main);
    }


    createStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            .icon {
                cursor       : pointer;
                width        : 32px;
                height       : 32px;
                position     : absolute;
                top          : 50%;
                left         : 50%;
                transform    : translate(-50%,-50%);
                border-radius: 50%;
                transition   : transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: #2960EC;
                width           : 48px;
                height          : 48px;
                position        : relative;
                border-radius   : 50%;
            }
            .message-container {
                box-shadow   : 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                right        : 32px;
                bottom       : 60px;
                position     : absolute;
                max-height   : 80vh;
                border-radius: 4px;
                overflow-y   : auto;
                transition   : max-height .2s ease;
                font-family: 'Inter', sans-serif;
            }

            .message-container {
                -ms-overflow-style: none;  /* Internet Explorer 10+ */
                scrollbar-width: none;  /* Firefox */
            }
            .message-container::-webkit-scrollbar { 
                display: none;  /* Safari and Chrome */
            }

            .message-container.hidden {
                max-height: 0px;
            }
            .message-container h2 {
                margin          : 0;
                padding         : 20px 20px;
                color           : #fff;
                background-color: #04b73f;
            }
            .message-container .content {
                margin          : 20px 10px ;
                border          : 1px solid #dbdbdb;
                padding         : 10px;
                display         : flex;
                background-color: #fff;
                flex-direction  : column;
            }
            .message-container form * {
                margin: 5px 0;
            }
            .message-container form input {
                padding: 10px;
            }
            .message-container form textarea {
                height: 100px;
                padding: 10px;
            }
            .message-container form textarea::placeholder {
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container form button {
                cursor          : pointer;
                background-color: #04b73f;
                color           : #fff;
                border          : 0;
                border-radius   : 4px;
                padding         : 10px;
            }
            .message-container form button:hover {
                background-color: #16632f;
            }
            .box-shadow{
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            }

            .topBox{
                width                  : 380px;
                height                 : 200px;
                padding                : 24px 24px 32px 24px;
                box-sizing             : border-box;
                border-top-left-radius : 4px;
                border-top-right-radius: 4px;
            }
    
            .topBoxOverlay{
                position  : absolute;
                width     : 100%;
                height    : 100%;
                top       : 0;
                z-index   : -1;
                left      : 0;
                background: linear-gradient(141.86deg, rgba(0, 0, 0, 0) 21.99%, #000000 205.74%);
            }
    
            .widgetLogo{
                height       : 40px;
                width        : 40px;
                border-radius: 50%;
            }
    
            .widgetBox{
                width        : 380px;
                border-radius: 4px;
            }
    
            .upperBox{
                box-shadow   : 0px 4px 6px rgba(0, 0, 0, 0.08);
                border-radius: 4px;
                padding      : 20px;
                margin-top   : -42px;
            }
    
            .joinBtn{
                border-radius: 6px;
                padding      : 16px 24px;
                color        : white;
                margin-top   : 8px;
                text-align   : center;
            }
    
            .crossIcon{
                top: 24px;
                right: 24px;
            }
           
            .lowerBox{
                padding      : 20px;
                margin-top   : 16px;
                background   : #F5F5F5;
                box-shadow   : 0px 4px 6px rgba(0, 0, 0, 0.08);
                border-radius: 4px;
            }
    
            .cp{
                cursor: pointer;
            }

            .d-flex{
                display: flex;
            }

            .flex-column{
                flex-direction : column;
            }

            .text-center{
                text-align: center;
            }

            .LinkL12R {
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: 0.1px;
            }

            .BodyB14R {
                font-family: "Inter", sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 16px;
                letter-spacing: 0.1px;
            }
            
            .BodyB16R {
                font-family: "Inter", sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
            }

            .HeadingH16M {
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                letter-spacing: 0.1px;
            }

            .justify-content-center{
                justify-content : center;
            }

            .space-between{
                justify-content: space-between;
            }

            .align-items-center{
                align-items : center;
            }

            .bottomIcon{
                height: 20px;
                width : 20px;
                margin-right: 16px;
            }


        `.replace(/^\s+|\n/gm, '');
        document.head.appendChild(styleTag);
    }


    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
            let a = document.getElementById('widgetButton').style.boxShadow = "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
        } else {
            this.createMessageContainerContent();
            this.chatIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            this.messageContainer.classList.add('hidden');
            let a = document.getElementById('widgetButton').style.boxShadow = "none"
        }
    }


    createWidget(){
        return(
            ` <div class="flowSection w-100 bg-color-neutral0 middle" style="height: 70vh; width: 400px;">
                    <iframe width="400px" src="https://47b3b2d5d0c924c936.gradio.live" height="100%"></iframe>
              </div>
            `
        )
    }

}