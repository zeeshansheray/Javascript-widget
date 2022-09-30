import axios from "axios";

export class Widget {
    constructor({ position = 'bottom-right'}) {
        this.position = this.getPosition(position);
        this.open = false;
        // window.onload = function(e){ 
        this.initialise();
        this.getGrowthTool = this.getGrowthTool();
        this.getBrand      = this.getBrand();
        this.createStyles();
        this.GiftIcon     = window.location.origin + '/assets/gift.svg';
        this.StarIcon     = window.location.origin + '/assets/star.svg';
        this.brand        = {};
        this.growthTool   = {};
        this.brandDetails = document.currentScript.getAttribute('brand').split('&')
        // }
    }

    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px',
        };
    }
    
    initialise() {

        this.getGrowthTool();

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
        this.applyThemeChange();

        },3000)
    }

    async getGrowthTool(){
        let brandId = document.currentScript.getAttribute('brand').split('&')[0]
        await axios.get(`http://localhost:8080/api/v4/growthtool?brandId=${brandId}&growthtoolType=widget`).then((resp) => {
            console.log(resp);
            this.growthTool = resp.data.data[0];
        }).catch(function (error) {
            console.log('err', error)
        })
    }

    async getBrand(){
        let brandId = document.currentScript.getAttribute('brand').split('&')[0]
        await axios.get(`http://localhost:8080/api/v4/brand?_id=${brandId}`).then((resp) => {
            console.log(resp);
            this.brand = resp.data.data[0];
        }).catch(function (error) {
            console.log('err', error)
        })
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

    applyThemeChange(){
        // console.log('---> ',   document.getElementById('joinHeading'))
        if(this.growthTool.widget.theme == 'light'){
            document.getElementById         ('joinHeading').style.color         = "#000000"
            document.getElementById         ('brandName').style.color           = "#000000"
            document.getElementsByClassName('lowerBox')[0].style.background     = 'rgb(245, 245, 245)'
            document.getElementsByClassName('bottomBox')[0].style.background    = '#ffffff'
            document.getElementsByClassName('upperDescription')[0].style.color  = 'rgb(89, 97, 115)'
            document.getElementsByClassName('upperDescription')[1].style.color  = 'rgb(89, 97, 115)'
            document.getElementsByClassName('alreadyRegistered')[0].style.color = 'rgb(89, 97, 115)'
            document.getElementsByClassName('ways')[0].style.color              = 'rgb(89, 97, 115)'
            document.getElementsByClassName('ways')[1].style.color              = 'rgb(89, 97, 115)'
            document.getElementsByClassName('upperBox')[0].style.background     = '#F5F5F5'
            document.getElementsByClassName('upperTitle')[0].style.color        = 'rgb(20, 21, 25)'
            document.getElementsByClassName('upperTitle')[1].style.color        = 'rgb(20, 21, 25)'
            document.getElementById         ('arrow1').style.stroke             = '#596173'
            document.getElementById         ('arrow2').style.stroke             = '#596173'
        }

        else{
            document.getElementById         ('joinHeading').style.color         = "#ffffff"
            document.getElementById         ('brandName').style.color           = "#ffffff"
            document.getElementsByClassName('lowerBox')[0].style.background     = 'rgb(46, 48, 57)'
            document.getElementsByClassName('bottomBox')[0].style.background    = 'rgb(20, 20, 20)'
            document.getElementsByClassName('upperBox')[0].style.background     = 'rgb(46, 48, 57)'
            document.getElementsByClassName('upperDescription')[0].style.color  = '#f5f7fc'
            document.getElementsByClassName('upperDescription')[1].style.color  = '#f5f7fc'
            document.getElementsByClassName('alreadyRegistered')[0].style.color = '#f5f7fc'
            document.getElementsByClassName('upperTitle')[0].style.color        = 'rgb(252, 252, 253)'
            document.getElementsByClassName('upperTitle')[1].style.color        = 'rgb(252, 252, 253)'
            document.getElementsByClassName('ways')[0].style.color              = 'rgb(252, 252, 253)'
            document.getElementsByClassName('ways')[1].style.color              = 'rgb(252, 252, 253)'
            document.getElementById         ('arrow1').style.stroke             = 'rgb(252, 252, 253)'
            document.getElementById         ('arrow2').style.stroke             = 'rgb(252, 252, 253)'
        }

        console.log('---> ', document.getElementById('star'))

        document.getElementsByClassName('topBox')[0].style.background  = this.growthTool.widget.primaryColor
        document.getElementsByClassName('joinBtn')[0].style.background = this.growthTool.widget.primaryColor
        document.getElementsByClassName('signIn')[0].style.color       = this.growthTool.widget.primaryColor
        document.getElementById         ('star').style.fill           =  this.growthTool.widget.primaryColor
        document.getElementById         ('gift').style.fill           =  this.growthTool.widget.primaryColor

    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
            let a = document.getElementById('widgetButton').style.boxShadow = "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
            this.applyThemeChange();
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
            ` <div class="flowSection w-100 bg-color-neutral0 middle">
                 <div class="widgetBox d-flex flex-column">
                 <div class="topBox position-relative">
                     <div class="topBoxOverlay"></div>
                     <div class="position-absolute z-index-1">
                     <img src=${this.brandDetails[1]} class="widgetLogo" 
                     alt=""/>
                     <div id="joinHeading"  style="margin-top: 16px;">
                         Join the community      
                     </div>
                     <div id="brandName" style="font-size : 32px; font-weight: 600;">
                        ${this.brand.brandName}
                     </div>  
                     </div>
                 </div>
                 <div class="d-flex flex-column bottomBox" style="padding: 24px;" >
                     <div class="upperBox" style="z-index: 20;" >
                         <div class="HeadingH16M upperTitle"  >
                             Become a member
                         </div>
                         <div class="BodyB14R upperDescription" style="margin-top: 8px;" >
                             With more ways to unlock exciting deals, this is your all access pass to exclusive rewards.
                         </div>
                         <div class="joinBtn middle BU14M cp"  >
                             Join Now
                         </div>
                         <div class="d-flex LinkL12R justify-content-center" style="margin-top: 8px" >
                             <div class="alreadyRegistered" style="margin-right: 4px;">Already have an account?</div> <div class="signIn cp">Sign In</div>
                         </div>
                     </div>

                     <div class="lowerBox">
                         <div class="HeadingH16M upperTitle" >
                             Points
                         </div>
                         <div class="BodyB14R upperDescription" style="margin-top: 8px;" >
                             Earn more Points for different actions, and turn those Points into awesome rewards!
                         </div>
                         <div class="d-flex cp space-between align-items-center" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 0.5px solid #d6dae9;">
                             <div class="d-flex align-items-center">
                                <div class="bottomIcon">
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="star" d="M11.2447 0.674465C11.1784 0.683607 11.0961 0.701893 11.0618 0.715607C11.0275 0.729322 10.9498 0.749893 10.8881 0.765893C10.7144 0.80475 10.623 0.861893 10.4515 1.04475C9.94182 1.57504 9.29039 2.68818 8.67325 4.08246C8.48125 4.51675 8.17496 5.24361 7.33839 7.26875L7.10982 7.81732H6.76925C6.58182 7.81732 5.79553 7.80132 5.02296 7.78304C2.54982 7.72361 1.77039 7.73504 1.3201 7.84018C0.723533 7.98189 0.620676 8.03218 0.52239 8.22875C0.37839 8.51904 0.449247 8.80704 0.84239 9.52018C1.22868 10.2196 1.63553 10.6356 4.18182 12.9305C4.55439 13.2665 4.86525 13.5499 4.8721 13.5613C4.87896 13.5728 4.80125 13.8219 4.70068 14.1168C4.25268 15.4265 4.08582 15.975 3.54639 17.9316C2.89725 20.2745 2.84696 20.5145 2.84239 21.1453L2.8401 21.5133L2.93839 21.7053C2.99325 21.8105 3.05953 21.9133 3.08468 21.9339C3.13039 21.9682 3.1281 21.9728 3.02982 22.1282C2.80353 22.4848 2.48582 23.0242 2.48582 23.0539C2.4881 23.2322 2.95439 23.3168 3.41153 23.223C4.06753 23.0859 5.01153 22.6585 5.61039 22.2242C5.80239 22.087 6.43325 21.5796 8.13382 20.1945C9.13496 19.3785 10.2595 18.4688 10.2664 18.4688C10.2687 18.4688 10.511 18.6905 10.8058 18.9602C11.4138 19.5225 11.5258 19.623 12.2138 20.2516C12.4881 20.5008 12.9544 20.9328 13.2492 21.2116C14.2504 22.151 14.6572 22.5076 15.231 22.9396C15.551 23.1796 15.6995 23.2688 15.8801 23.3305C16.0058 23.3739 16.0332 23.3762 16.127 23.351C16.3372 23.2962 16.4744 23.1568 16.5681 22.9145C16.591 22.855 16.6344 22.7682 16.6641 22.7225C16.6961 22.679 16.7281 22.6036 16.7372 22.5556C16.7464 22.5076 16.7624 22.4573 16.7738 22.4436C16.783 22.4299 16.8195 22.3225 16.8538 22.2036C16.9864 21.735 16.9407 20.6493 16.7144 18.9145C16.5864 17.9293 16.3258 16.5145 15.9235 14.5968C15.8618 14.3019 15.8115 14.0413 15.8115 14.0208C15.8115 13.9819 16.0584 13.7968 17.0115 13.1133C17.2264 12.9602 17.487 12.7705 17.5944 12.695C18.2961 12.1876 18.8218 11.815 19.503 11.3373C20.6252 10.551 20.7532 10.439 20.9452 10.0573C21.1487 9.65732 21.2355 9.34418 21.2241 9.04704C21.215 8.75675 21.1784 8.71332 20.7692 8.50761C20.4081 8.32704 20.0607 8.22875 19.503 8.15104C18.9475 8.07332 18.6527 8.05961 16.9087 8.02304C15.9967 8.00247 15.0527 7.97961 14.8081 7.97047L14.3647 7.95447L14.1498 7.13161C13.5327 4.75675 13.231 3.73732 12.7784 2.50304C12.3921 1.45161 12.0675 0.86875 11.8184 0.78875C11.775 0.77275 11.7018 0.736179 11.6561 0.706465C11.5715 0.647036 11.4778 0.640179 11.2447 0.674465ZM11.5098 2.26989C11.8115 3.04018 12.1864 4.33161 12.5087 5.72589C12.6435 6.30647 13.0001 7.90189 13.0001 7.92704C13.0001 7.94075 12.6024 7.94532 11.8641 7.93389C10.3555 7.91332 8.30525 7.87218 8.29382 7.86075C8.28925 7.85618 8.32353 7.76704 8.37153 7.66418C8.41725 7.55904 8.72353 6.87561 9.0481 6.14418C9.37268 5.41275 9.7201 4.64704 9.81839 4.44132C10.1292 3.79446 10.5201 3.10189 10.8881 2.54875C11.0801 2.25618 11.343 1.94532 11.3772 1.96589C11.3887 1.97275 11.4481 2.10989 11.5098 2.26989ZM4.71439 9.15447C6.12925 9.18189 6.5361 9.20018 6.52239 9.23218C6.46753 9.35332 5.96696 10.6402 5.78639 11.1248C5.66296 11.4608 5.55325 11.7373 5.54639 11.7373C5.53953 11.7373 5.43668 11.6482 5.31782 11.5385C4.81953 11.079 3.70639 10.0848 3.1921 9.64132L2.64125 9.16589L2.8081 9.15218C3.08925 9.13161 3.56239 9.13161 4.71439 9.15447ZM8.22753 9.30304C8.50868 9.32361 9.22182 9.38075 9.81153 9.43104C11.4344 9.56818 12.2481 9.62989 12.8287 9.65961C13.1441 9.67561 13.3658 9.69618 13.3795 9.71218C13.407 9.73732 13.471 10.039 13.8915 12.103L14.111 13.1865L13.8618 13.3465C13.1372 13.8036 11.7658 14.7362 10.6618 15.5179C10.3464 15.7419 10.0744 15.9316 10.0584 15.9362C10.0424 15.943 9.80925 15.7396 9.54182 15.4836C8.96582 14.9305 8.36239 14.3636 7.18296 13.2688C6.70525 12.8253 6.31668 12.4528 6.32125 12.4368C6.32582 12.423 6.43096 12.1442 6.55896 11.8173C6.89268 10.9579 7.21725 10.183 7.58296 9.37618C7.61496 9.30304 7.64468 9.26875 7.67439 9.26875C7.69953 9.26875 7.94868 9.28475 8.22753 9.30304ZM15.9487 9.82875C16.3692 9.84704 17.0184 9.87218 17.3887 9.88589C18.7738 9.93618 19.1075 9.95218 19.1167 9.96132C19.1372 9.97961 18.111 10.6813 17.2058 11.2688C16.7052 11.591 15.471 12.3545 15.4481 12.3545C15.4412 12.3545 15.4047 12.2242 15.3704 12.0619C15.2812 11.6642 14.8515 9.84018 14.8355 9.79904C14.8241 9.77161 14.8492 9.76932 15.0024 9.78075C15.1007 9.78989 15.5281 9.81047 15.9487 9.82875ZM6.59782 15.1179C7.4161 15.8539 8.11325 16.4893 8.49268 16.8413C8.56125 16.903 8.60696 16.9625 8.59553 16.9693C8.17039 17.2619 7.5601 17.703 7.17153 17.9956C6.15668 18.7636 4.76468 19.9408 4.31668 20.4139C4.13839 20.6036 3.72696 21.1019 3.57839 21.3145C3.53725 21.3693 3.53725 21.367 3.55096 21.2002C3.57153 20.9488 3.64468 20.535 3.71096 20.2859C3.7841 20.0162 4.53839 17.495 4.73725 16.8573C5.08925 15.7305 5.61268 14.2448 5.64925 14.2676C5.66068 14.2768 6.0881 14.6585 6.59782 15.1179ZM14.4858 15.0288C14.4858 15.0425 14.5475 15.3739 14.623 15.7648C15.0275 17.863 15.1898 18.9853 15.3155 20.5648L15.3452 20.9236L14.5887 20.1762C14.175 19.7648 13.6127 19.2276 13.343 18.983C12.847 18.535 11.9944 17.7579 11.7224 17.5042L11.5761 17.3693L12.0172 16.9945C12.9955 16.1625 14.4172 15.0059 14.463 15.0059C14.4767 15.0059 14.4858 15.0173 14.4858 15.0288Z" fill="#EA4335"/>
                                    </svg>
                                </div>
                                 <span class="ml-8 BodyB14R ways">Ways to Earn</span>
                             </div>
                             <span class="flip">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="arrow1" d="M1 1.04688L5.66667 5.71354L1 10.3802" stroke="#596173" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                             </span>
                         </div>  
                         <div class="bar"></div>
                         <div class="d-flex cp space-between align-items-center" style="margin-top:20px;">
                             <div class="d-flex align-items-center ">
                                 <div class="bottomIcon">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="gift" d="M15.3545 0.0546453C15.1305 0.0752168 14.6985 0.139217 14.6116 0.166645C14.5613 0.182645 14.367 0.235217 14.1796 0.278645C13.9922 0.32436 13.8276 0.370074 13.8139 0.381502C13.8002 0.390645 13.6859 0.434074 13.5602 0.475217C13.4345 0.51636 13.3019 0.562074 13.263 0.58036C13.2265 0.59636 13.0962 0.651217 12.9773 0.701503C12.5522 0.875217 12.4379 0.927788 12.1888 1.05579C11.679 1.31636 11.4482 1.47636 11.135 1.78722C10.9705 1.95179 10.7556 2.22836 10.6688 2.38607C10.5659 2.57122 10.4768 2.71522 10.4608 2.71522C10.4516 2.71522 10.4333 2.68779 10.4219 2.65122C10.3876 2.55522 10.1408 2.2215 9.94419 2.00665C9.57847 1.60893 9.17619 1.26836 8.84019 1.08093C8.24819 0.749503 7.6059 0.530074 7.01161 0.450074C6.73276 0.413503 6.11561 0.411217 5.88019 0.447788C5.6219 0.488931 5.24476 0.568931 5.21733 0.589503C5.2059 0.598645 5.1419 0.623788 5.0779 0.642074C4.73276 0.742645 4.43333 0.98036 4.21619 1.32093C4.12019 1.47179 4.05847 1.6295 3.96704 1.96093C3.93047 2.0935 3.95561 2.52093 4.01276 2.72665C4.09276 3.01236 4.13847 3.11522 4.3259 3.44664C4.57961 3.89693 4.69619 4.03636 5.06876 4.33807C5.4139 4.61693 5.84819 4.85693 6.26876 5.00093C6.4379 5.06036 6.44704 5.06493 6.39447 5.08779C6.36247 5.1015 5.9579 5.1335 5.49161 5.16093C4.32819 5.22493 3.67219 5.27293 3.61733 5.29807C3.59219 5.30722 3.45276 5.32779 3.30876 5.3415C2.9339 5.37807 2.25504 5.47864 2.20019 5.50379C2.17504 5.51522 1.94419 5.5655 1.6859 5.61579C1.04133 5.73922 0.849329 5.79636 0.723615 5.89693C0.668758 5.94264 0.577329 5.99522 0.520186 6.0135C0.321329 6.07979 0.325901 6.0615 0.330472 6.93922C0.332758 7.83522 0.348758 7.95179 0.506472 8.2535C0.824186 8.85922 0.872186 8.93236 1.02762 9.0375C1.08247 9.07407 1.17847 9.14493 1.24019 9.19522C1.30419 9.24779 1.39104 9.30265 1.43447 9.31865C1.4779 9.33693 1.56019 9.37122 1.61733 9.39636C1.74761 9.4535 2.07447 9.51979 2.32133 9.54036L2.51333 9.55636L2.49961 9.8215C2.49276 9.96779 2.49733 10.3221 2.51104 10.6124C2.52247 10.9004 2.54304 12.1255 2.55219 13.3324C2.56361 14.5392 2.5819 15.6706 2.59561 15.8466C2.60933 16.0226 2.64361 16.4501 2.66876 16.7952C2.69619 17.1404 2.7259 17.4604 2.73733 17.5038C2.74876 17.5472 2.7739 17.9175 2.79447 18.3266C2.81276 18.7358 2.83333 19.1404 2.84019 19.2295C2.8699 19.6135 2.92704 20.1232 2.94304 20.1438C2.95219 20.1552 2.96819 20.2695 2.97504 20.3952C2.9979 20.7015 3.03676 20.8821 3.11447 21.0146C3.14876 21.0764 3.23333 21.2295 3.3019 21.3552C3.42304 21.5792 3.45504 21.6158 3.7339 21.8535C3.8459 21.9495 3.86876 21.9609 3.93276 21.9495C3.9739 21.9404 4.0379 21.9129 4.07904 21.8901C4.17047 21.8329 4.43104 21.8284 5.61733 21.8558C6.58647 21.8786 7.75447 21.8375 9.49161 21.7209C9.74304 21.7026 10.4333 21.6592 11.023 21.6204C11.615 21.5815 12.2573 21.5335 12.4516 21.5175C13.2516 21.4444 14.6162 21.2981 14.6916 21.2775C14.735 21.2638 14.8745 21.2432 15.0002 21.2295C15.4733 21.1769 16.1225 21.0901 16.2002 21.0672C16.2436 21.0558 16.5888 21.0055 16.9659 20.9552C18.0768 20.8112 18.5088 20.7358 19.023 20.5941C19.2905 20.5209 19.3933 20.4821 19.4413 20.4364C19.4573 20.4204 19.4825 20.4066 19.4939 20.4066C19.5213 20.4066 19.6973 20.2466 19.6973 20.2192C19.6973 20.2078 19.7179 20.1781 19.7408 20.1529C19.7659 20.1255 19.791 20.0798 19.8002 20.0478C19.8208 19.9586 19.9099 19.7804 19.9442 19.7552C19.9602 19.7415 19.9808 19.6844 19.9876 19.6295C19.9945 19.5724 20.0128 19.5106 20.0288 19.4924C20.0448 19.4741 20.0813 19.3712 20.111 19.2638C20.1682 19.0466 20.1979 18.5575 20.1568 18.4752C20.1362 18.4341 20.1156 18.2764 19.9945 17.1952C19.9533 16.8341 19.7819 15.4489 19.7088 14.8935C19.6745 14.6215 19.5922 13.6981 19.5693 13.3095C19.5602 13.1701 19.5465 13.0466 19.5373 13.0352C19.5282 13.0215 19.5145 12.8684 19.5053 12.6924C19.4596 11.7758 19.3705 10.6032 19.3316 10.4638C19.3042 10.3609 19.135 8.93693 19.1488 8.92322C19.1556 8.91865 19.3248 8.88665 19.5259 8.85236C19.727 8.81807 19.903 8.78379 19.9145 8.77236C19.9282 8.76322 19.983 8.74722 20.0402 8.73807C20.0973 8.73122 20.2025 8.70836 20.2733 8.68779C20.4356 8.64436 20.5476 8.53236 20.6253 8.3335C20.655 8.25579 20.6962 8.17579 20.7145 8.15522C20.7328 8.13464 20.7488 8.08207 20.7488 8.03636C20.7488 7.98607 20.7648 7.94264 20.7922 7.9175C20.8425 7.87179 20.879 7.7415 20.9088 7.50607C20.9385 7.26379 20.9156 7.1015 20.8288 6.95522C20.7876 6.88893 20.7625 6.82493 20.7716 6.8135C20.7808 6.80436 20.8196 6.63979 20.8539 6.45236C20.9088 6.15293 20.9179 6.05236 20.9179 5.66379C20.9202 5.26607 20.9156 5.19979 20.8676 5.03979C20.8402 4.9415 20.7876 4.80664 20.7533 4.74264C20.719 4.67636 20.687 4.5735 20.6802 4.51407C20.6688 4.40664 20.6665 4.40207 20.5545 4.35636C20.4928 4.33122 20.367 4.27407 20.2779 4.23064C20.0745 4.13007 20.0082 4.13464 19.999 4.24893L19.9922 4.32893L19.199 4.39293C18.7625 4.42722 18.3693 4.46379 18.3259 4.47522C18.1865 4.51179 16.5819 4.60322 15.5716 4.63522C15.1442 4.64893 14.751 4.6695 14.6962 4.68093C14.5728 4.71064 14.4402 4.71064 14.4402 4.68322C14.4402 4.67179 14.495 4.64207 14.5613 4.61693C14.8082 4.52322 15.8733 3.94036 15.9488 3.85807C15.9556 3.85122 15.999 3.8215 16.0493 3.79407C16.3259 3.63179 16.7533 3.23179 17.0139 2.88893C17.1945 2.64665 17.263 2.52779 17.503 2.01807C17.5579 1.9015 17.6333 1.62265 17.6653 1.4215C17.7339 0.991788 17.6516 0.69236 17.4139 0.495788C17.1945 0.317502 16.7533 0.150645 16.3556 0.10036C16.0836 0.0660739 15.5282 0.040931 15.3545 0.0546453ZM16.5888 1.15865C16.6459 1.17465 16.7236 1.19979 16.7648 1.21807C16.8036 1.23636 16.847 1.25236 16.863 1.25236C16.895 1.25236 16.8905 1.2775 16.8196 1.51522C16.7716 1.67293 16.5773 1.99522 16.4516 2.12322C16.4196 2.15522 16.3625 2.21693 16.3236 2.26036C16.1293 2.47522 15.823 2.67636 15.2859 2.93922C15.0528 3.05122 14.8379 3.15179 14.8059 3.16093C14.7739 3.17007 14.6985 3.20436 14.639 3.23407C14.5773 3.26379 14.4379 3.32093 14.3305 3.3575C14.2208 3.39636 14.1019 3.43979 14.063 3.45807C14.0265 3.47407 13.9236 3.51064 13.8345 3.53807C13.7476 3.5655 13.5716 3.62264 13.4459 3.66379C13.3202 3.70722 13.1396 3.76436 13.0459 3.7895C12.9522 3.81693 12.8448 3.85122 12.8059 3.8695C12.7693 3.8855 12.6185 3.93122 12.4745 3.97236C12.3305 4.0135 12.2025 4.05464 12.1888 4.06379C12.1773 4.07522 12.0265 4.11636 11.8573 4.15522C11.6882 4.19636 11.4825 4.24664 11.4002 4.27179C11.2265 4.32207 10.8242 4.41122 10.8173 4.40207C10.815 4.3975 10.8196 4.33807 10.8265 4.26493C10.8379 4.16436 10.863 4.10722 10.9385 3.99979C10.991 3.92436 11.0345 3.85579 11.0345 3.84893C11.0345 3.82379 11.4642 3.20893 11.6082 3.02607C11.7476 2.85236 12.0379 2.57807 12.1705 2.49579C12.2048 2.47293 12.2459 2.4455 12.2573 2.43179C12.367 2.31293 13.2425 1.83293 13.6173 1.68207C13.711 1.6455 13.8002 1.60665 13.8116 1.59522C13.8253 1.58607 13.9488 1.53807 14.0859 1.49236C14.2253 1.44436 14.3488 1.39636 14.3625 1.38493C14.3762 1.37579 14.5293 1.33007 14.7008 1.28893C14.8722 1.2455 15.023 1.20207 15.0345 1.19522C15.0482 1.18607 15.1579 1.1655 15.2813 1.1495C15.5419 1.11065 16.4265 1.11979 16.5888 1.15865ZM6.57047 1.5495C6.73047 1.56322 6.88361 1.58379 6.90876 1.59522C6.9339 1.60436 7.02076 1.62722 7.10304 1.64093C7.3179 1.67979 7.62876 1.75522 7.70876 1.7895C7.74761 1.8055 7.85961 1.84893 7.96019 1.88322C8.17733 1.95865 8.55676 2.15293 8.7419 2.28093C9.14419 2.55979 9.66076 3.11064 9.91219 3.52664L9.9899 3.65464L9.99219 4.10493C9.99447 4.35179 10.0036 4.57122 10.015 4.59179C10.0242 4.61693 10.0196 4.63293 9.99904 4.64207C9.96704 4.6535 9.34304 4.51407 9.26304 4.47522C9.2379 4.46379 9.05733 4.41807 8.86304 4.37236C8.66876 4.32664 8.48819 4.28093 8.46304 4.2695C8.41047 4.24436 7.99676 4.15293 7.75447 4.11179C7.66761 4.09579 7.5739 4.07522 7.54876 4.06379C7.52361 4.05236 7.43676 4.03407 7.35447 4.01807C7.11904 3.97693 6.68933 3.87864 6.64819 3.85807C6.62761 3.84664 6.50419 3.8055 6.37161 3.76436C5.83676 3.5975 5.43904 3.33007 5.18761 2.96207C5.14647 2.90265 5.11447 2.85007 5.11447 2.84322C5.11447 2.83636 5.08247 2.7655 5.04361 2.68779C4.96361 2.52322 4.9019 2.24665 4.92476 2.1415C4.94076 2.0615 5.12361 1.86265 5.26304 1.7735C5.41161 1.67979 5.73619 1.57236 5.93047 1.55179C6.18876 1.52436 6.2459 1.52436 6.57047 1.5495ZM19.7773 5.19979C19.7682 5.24779 19.7522 5.29807 19.743 5.3095C19.7316 5.32322 19.7019 5.46264 19.6745 5.61807C19.6219 5.92893 19.5602 6.19407 19.5396 6.21236C19.5008 6.24207 19.3933 6.74722 19.3819 6.93922C19.375 7.06493 19.3613 7.15636 19.3453 7.16093C19.3316 7.1655 18.8059 7.1975 18.1773 7.2295C17.5488 7.2615 16.8653 7.29807 16.6573 7.31179C15.791 7.36436 15.5488 7.37579 14.6345 7.39864C12.3533 7.46036 11.9876 7.4695 11.6608 7.48322L11.3156 7.49693L11.231 6.88664C11.1853 6.55064 11.1373 6.25579 11.1259 6.23522C11.1145 6.21236 11.1008 6.11864 11.0985 6.02722L11.0916 5.86036L11.2288 5.83064C11.3042 5.81464 11.6448 5.78722 11.983 5.76893C12.3236 5.74836 12.7145 5.72322 12.8516 5.71179C12.991 5.69807 13.2105 5.68207 13.343 5.67522C13.935 5.6455 15.5648 5.54493 15.7636 5.52664C15.8848 5.5175 16.3373 5.47636 16.7716 5.4375C17.2059 5.39864 17.7042 5.35064 17.8802 5.33236C18.5133 5.26836 19.263 5.18379 19.4939 5.15179C19.6242 5.13579 19.7453 5.11979 19.7636 5.1175C19.7865 5.11522 19.791 5.13579 19.7773 5.19979ZM9.96476 6.70836C9.96019 7.17007 9.94876 7.53122 9.93733 7.53807C9.9259 7.54493 9.19904 7.57007 8.32133 7.59293C6.74419 7.63407 4.68933 7.71864 4.6459 7.74836C4.63447 7.75522 4.21161 7.77579 3.70647 7.79179C2.9819 7.81464 2.72819 7.81464 2.4859 7.79179C2.31676 7.77579 2.16819 7.75522 2.15447 7.74607C2.14304 7.73464 2.09504 7.72093 2.0539 7.71179C1.85276 7.67522 1.7979 7.65007 1.77504 7.58836C1.74761 7.51979 1.70419 7.0535 1.69961 6.77464L1.69733 6.59407L1.81161 6.56664C1.87561 6.55293 1.93961 6.53464 1.95333 6.5255C1.98761 6.50493 2.60247 6.42722 3.19447 6.37236C3.46419 6.34722 3.78876 6.3175 3.91447 6.30379C4.04019 6.29236 4.44704 6.26722 4.81733 6.24664C6.25961 6.1735 6.77619 6.1415 6.92019 6.12093C7.00247 6.1095 7.60361 6.0615 8.25733 6.01807C8.91104 5.97464 9.49161 5.92893 9.54876 5.9175C9.6059 5.90836 9.72476 5.89693 9.81161 5.89464L9.97161 5.89236L9.96476 6.70836ZM18.1659 9.1815C18.1659 9.28207 18.1819 9.61807 18.2002 9.93122C18.2482 10.7152 18.2802 11.7346 18.2802 12.4341C18.2802 12.7586 18.2893 13.0672 18.303 13.1198C18.3145 13.1746 18.335 13.5106 18.3488 13.8695C18.3693 14.4341 18.4585 15.8489 18.4973 16.2238C18.5545 16.7746 18.5842 18.6946 18.5362 18.7426C18.4859 18.7929 18.0722 18.8638 17.343 18.9438C17.0093 18.9804 16.5682 19.0306 16.3602 19.0558C15.9008 19.1129 15.0116 19.1952 14.8653 19.1952C14.8082 19.1952 14.7419 19.2044 14.719 19.2158C14.6985 19.2272 14.4699 19.2478 14.2116 19.2615C13.9533 19.2752 13.4505 19.3026 13.0916 19.3209C12.7328 19.3392 12.3602 19.3598 12.2642 19.3644L12.0882 19.3758L12.1133 19.3141C12.127 19.2798 12.1453 19.2318 12.1545 19.2066C12.2848 18.8775 12.2962 18.2604 12.1888 17.4352C12.1705 17.3026 12.1133 16.8455 12.063 16.4181C12.0105 15.9906 11.9579 15.6204 11.9488 15.5952C11.9053 15.4901 11.8413 14.5712 11.7888 13.2524C11.7773 12.9324 11.7568 12.6169 11.743 12.5552C11.7225 12.4432 11.6973 12.0615 11.6059 10.4066C11.5808 9.95407 11.5488 9.55179 11.5373 9.51293C11.5236 9.47407 11.5145 9.39636 11.5145 9.33693V9.2295L11.6356 9.22722C11.6996 9.22493 11.903 9.21579 12.0859 9.20436C12.927 9.15636 14.015 9.1175 15.0665 9.09465C16.8059 9.05579 18.0836 9.0215 18.095 9.01007C18.0996 9.0055 18.1179 9.00093 18.1362 9.00093C18.159 9.00093 18.1659 9.04665 18.1659 9.1815ZM9.94647 10.2626C9.93047 11.3918 9.96933 14.5141 10.0082 15.1084C10.0333 15.4855 10.0585 15.7415 10.1659 16.6238C10.191 16.8364 10.2368 17.2386 10.2688 17.5152C10.3442 18.2009 10.3876 18.5186 10.4288 18.7289C10.4653 18.9095 10.639 19.3301 10.7076 19.4055C10.7373 19.4398 10.7373 19.4466 10.7122 19.4558C10.6939 19.4626 10.3968 19.4901 10.0516 19.5152C9.70647 19.5426 9.29047 19.5792 9.1259 19.5952C8.96361 19.6135 8.54076 19.6592 8.18876 19.6958C7.83676 19.7346 7.4299 19.7804 7.2859 19.8009C7.1419 19.8215 6.65276 19.8809 6.20019 19.9358C5.74761 19.9884 5.36133 20.0386 5.34304 20.0478C5.32476 20.0546 5.15104 20.0752 4.95904 20.0912L4.61161 20.1232L4.58876 20.0409C4.54761 19.8809 4.46304 18.8912 4.41733 18.0295C4.41047 17.8855 4.39447 17.7301 4.38304 17.6866C4.37161 17.6432 4.3259 17.1541 4.28019 16.6009C4.23676 16.0478 4.18876 15.5495 4.17733 15.4924C4.14761 15.3415 4.1339 14.9621 4.10876 13.5266C4.07904 11.8878 4.0219 10.6421 3.97161 10.5209C3.9579 10.4844 3.8779 9.67979 3.88019 9.5815C3.88019 9.5655 3.99447 9.55179 4.20704 9.54265C5.10761 9.5015 6.74419 9.40779 6.87447 9.38722C6.95676 9.37579 7.66076 9.34607 8.44019 9.32322C9.21961 9.30036 9.88019 9.27979 9.9099 9.2775L9.96019 9.27522L9.94647 10.2626Z" fill="#EA4335"/>
                                    </svg>
                                 </div>
                                 <span class="ml-8 BodyB14R ways">Ways to Redeem</span>
                             </div>
                             <span class="flip">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="arrow2" d="M1 1.04688L5.66667 5.71354L1 10.3802" stroke="#596173" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                             </span>
                         </div>  
                     </div>
                 </div>

                 <div class="crossIcon position-absolute">
                     <SvgIcons.CrossIcon/>
                 </div>
            `
        )
    }

}