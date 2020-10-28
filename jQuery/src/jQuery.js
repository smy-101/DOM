window.$ = window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return {
        oldApi = selectorOrArray.oldApi,
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector){
            let array = []
            for(let i=0;i<elements.length;i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this  //this指的是查找前的api
            return jQuery(array)
        },
        end(){
            return this.oldApi  //this指代当前api
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
                fn.call(null,elements[i],i)
            }
            return this
        },
        parent(){
            const array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode)===-1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children(){
            const array = []
            this.each((node)=>{
                array.push(...node.children)   //(...node.children)等价于(node.children[o],node.children[1],node.children[2],...),...叫做展开操作符
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        }
    }
}

window.$ = window.jQuery

jQuery.prototype = {
    constructor:jQuery
}