var t={d:(o,e)=>{for(var s in e)t.o(e,s)&&!t.o(o,s)&&Object.defineProperty(o,s,{enumerable:!0,get:e[s]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o)},o={};t.d(o,{V:()=>e});class e{webcimesModals;modal;options;eventCancelButton=()=>{"function"==typeof this.options.onCancelButton&&this.options.onCancelButton()};eventConfirmButton=()=>{"function"==typeof this.options.onConfirmButton&&this.options.onConfirmButton()};eventClickOutside=t=>{t.target==this.webcimesModals&&(this.options.allowCloseOutside?this.destroy():(this.modal.classList.add("animGrowShrink"),setTimeout((()=>{this.modal.classList.remove("animGrowShrink")}),this.options.animationDuration)))};eventClickCloseButton=()=>{this.destroy()};eventDragModalOnTop=t=>{if(!t.target.closest(".close")&&document.querySelectorAll(".modal").length>1&&null!==this.modal.nextElementSibling){let t=this.modal.scrollTop;this.webcimesModals.insertAdjacentElement("beforeend",this.modal),this.modal.scrollTop=t}};position;offset;isDragging=!1;moveFromElements=[];eventDragStart=t=>{t.target.closest("button")||(this.isDragging=!0,t.clientX?this.offset={x:this.modal.offsetLeft-t.clientX,y:this.modal.offsetTop-t.clientY}:t.touches&&(this.offset={x:this.modal.offsetLeft-t.touches[0].clientX,y:this.modal.offsetTop-t.touches[0].clientY}))};eventMove=t=>{this.isDragging&&(t.clientX?this.position={x:t.clientX,y:t.clientY}:t.touches&&(this.position={x:t.touches[0].clientX,y:t.touches[0].clientY}),this.modal.style.left=this.position.x+this.offset.x+"px",this.modal.style.top=this.position.y+this.offset.y+"px")};eventDragStop=()=>{this.isDragging=!1};eventPreventSelectText=t=>{this.isDragging&&t.preventDefault()};eventResize=()=>{this.modal.style.removeProperty("left"),this.modal.style.removeProperty("top")};constructor(t){this.options={setId:null,setClass:null,width:"auto",height:"auto",titleHtml:null,bodyHtml:null,buttonCancelHtml:null,buttonConfirmHtml:null,closeOnCancelButton:!0,closeOnConfirmButton:!0,showCloseButton:!0,allowCloseOutside:!0,allowMovement:!0,moveFromHeader:!0,moveFromBody:!1,moveFromFooter:!0,stickyHeader:!0,stickyFooter:!0,style:null,animationOnShow:"animDropDown",animationOnDestroy:"animDropUp",animationDuration:500,beforeShow:()=>{},afterShow:()=>{},beforeDestroy:()=>{},afterDestroy:()=>{},onCancelButton:()=>{},onConfirmButton:()=>{},...t},this.init()}init(){if(document.querySelector(".webcimesModals")?(this.webcimesModals=document.querySelector(".webcimesModals"),this.webcimesModals.classList.remove("animFadeOut")):(document.body.insertAdjacentHTML("beforeend",'<div class="webcimesModals animFadeIn"></div>'),this.webcimesModals=document.querySelector(".webcimesModals"),this.webcimesModals.style.setProperty("animation-duration",this.options.animationDuration+"ms"),setTimeout((()=>{this.webcimesModals.classList.remove("animFadeIn")}),this.options.animationDuration)),this.webcimesModals.insertAdjacentHTML("beforeend",'<div class="modal '+(this.options.setClass?this.options.setClass:"")+" "+this.options.animationOnShow+'" '+(this.options.setId?'id="'+this.options.setId+'"':"")+">\n\t\t\t\t"+(this.options.titleHtml||this.options.showCloseButton?'<div class="modalHeader '+(this.options.stickyHeader?"sticky":"")+" "+(this.options.moveFromHeader?"movable":"")+'">\n\t\t\t\t\t\t'+(this.options.titleHtml?'<div class="title">'+this.options.titleHtml+"</div>":"")+"\n\t\t\t\t\t\t"+(this.options.showCloseButton?'<button class="close"></button>':"")+"\n\t\t\t\t\t</div>":"")+"\n\t\t\t\t"+(this.options.bodyHtml?'<div class="modalBody '+(this.options.moveFromBody?"movable":"")+'">\n\t\t\t\t\t\t'+this.options.bodyHtml+"\n\t\t\t\t\t</div>":"")+"\n\t\t\t\t"+(this.options.buttonCancelHtml||this.options.buttonConfirmHtml?'<div class="modalFooter '+(this.options.stickyFooter?"sticky":"")+" "+(this.options.moveFromFooter?"movable":"")+'">\n\t\t\t\t\t\t'+(this.options.buttonCancelHtml?'<button class="cancel '+(this.options.closeOnCancelButton?"close":"")+'">'+this.options.buttonCancelHtml+"</button>":"")+"\n\t\t\t\t\t\t"+(this.options.buttonConfirmHtml?'<button class="confirm '+(this.options.closeOnConfirmButton?"close":"")+'">'+this.options.buttonConfirmHtml+"</button>":"")+"\n\t\t\t\t\t</div>":"")+"\n\t\t\t</div>"),this.modal=this.webcimesModals.lastElementChild,"function"==typeof this.options.beforeShow&&setTimeout((()=>{this.options.beforeShow()}),0),this.modal.style.setProperty("animation-duration",this.options.animationDuration+"ms"),setTimeout((()=>{this.modal.classList.remove(this.options.animationOnShow),"function"==typeof this.options.afterShow&&this.options.afterShow()}),this.options.animationDuration),this.modal.style.setProperty("max-width","90%"),"auto"!=this.options.width&&this.options.width?this.modal.style.setProperty("width",this.options.width):this.modal.style.setProperty("width","max-content"),this.modal.style.setProperty("max-height","90%"),"auto"!=this.options.height&&this.options.height?this.modal.style.setProperty("height",this.options.height):this.modal.style.setProperty("height","max-content"),this.options.style){let t=this.modal.getAttribute("style");this.modal.setAttribute("style",t+this.options.style)}this.options.buttonCancelHtml&&this.modal.querySelector(".cancel")?.addEventListener("click",this.eventCancelButton),this.options.buttonConfirmHtml&&this.modal.querySelector(".confirm")?.addEventListener("click",this.eventConfirmButton),this.webcimesModals.addEventListener("click",this.eventClickOutside),this.modal.querySelectorAll(".close").forEach((t=>{t.addEventListener("click",this.eventClickCloseButton)})),["mousedown","touchstart"].forEach((t=>{this.modal.addEventListener(t,this.eventDragModalOnTop)})),this.options.allowMovement&&(this.options.moveFromHeader||this.options.moveFromBody||this.options.moveFromFooter)&&(this.options.moveFromHeader&&this.modal.querySelector(".modalHeader")&&this.moveFromElements.push(this.modal.querySelector(".modalHeader")),this.options.moveFromBody&&this.modal.querySelector(".modalBody")&&this.moveFromElements.push(this.modal.querySelector(".modalBody")),this.options.moveFromFooter&&this.modal.querySelector(".modalFooter")&&this.moveFromElements.push(this.modal.querySelector(".modalFooter")),["mousedown","touchstart"].forEach((t=>{this.moveFromElements.forEach((o=>{o.addEventListener(t,this.eventDragStart)}))})),["mousemove","touchmove"].forEach((t=>{document.addEventListener(t,this.eventMove)})),["mouseup","touchend"].forEach((t=>{document.addEventListener(t,this.eventDragStop)})),document.addEventListener("selectstart",this.eventPreventSelectText)),window.addEventListener("resize",this.eventResize)}destroy(){this.modal.getAttribute("data-destroying")||("function"==typeof this.options.beforeDestroy&&this.options.beforeDestroy(),1==document.querySelectorAll(".modal:not([data-destroying])").length&&this.webcimesModals.classList.add("animFadeOut"),this.modal.setAttribute("data-destroying","1"),this.modal.classList.add(this.options.animationOnDestroy),setTimeout((()=>{void 0!==this.modal&&(this.options.buttonCancelHtml&&this.modal.querySelector(".cancel")?.removeEventListener("click",this.eventCancelButton),this.options.buttonConfirmHtml&&this.modal.querySelector(".confirm")?.removeEventListener("click",this.eventConfirmButton),this.webcimesModals.removeEventListener("click",this.eventClickOutside),this.modal.querySelectorAll(".close").forEach((t=>{t.removeEventListener("click",this.eventClickCloseButton)})),["mousedown","touchstart"].forEach((t=>{this.modal.removeEventListener(t,this.eventDragModalOnTop)})),this.options.allowMovement&&(this.options.moveFromHeader||this.options.moveFromBody||this.options.moveFromFooter)&&(["mousedown","touchstart"].forEach((t=>{this.moveFromElements.forEach((o=>{o.removeEventListener(t,this.eventDragStart)}))})),["mousemove","touchmove"].forEach((t=>{document.removeEventListener(t,this.eventMove)})),["mouseup","touchend"].forEach((t=>{document.removeEventListener(t,this.eventDragStop)})),document.removeEventListener("selectstart",this.eventPreventSelectText)),window.removeEventListener("resize",this.eventResize),(document.querySelectorAll(".modal").length>1?this.modal:this.webcimesModals).remove()),"function"==typeof this.options.afterDestroy&&this.options.afterDestroy()}),this.options.animationDuration))}}var s=o.V;export{s as WebcimesModal};
//# sourceMappingURL=webcimes-modal.esm.js.map