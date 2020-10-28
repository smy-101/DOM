window.dom = {
    create(string){
        const container = document.createElement("template") //template能够包裹任何元素
        container.innerHTML = string.trim() //防止空格的出现导致获取出现问题
        return container.content.firstChild
    },
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling)  
        //原来用于将节点插入某节点前，这里的意思是将node2插入到node节点的下一个节点前，即插到node节点后面
    },
    before(node,node2){
        node.parentNode.insertBefore(node2,node)  
    },
    append(parent,node){
        parent.appendChild(node)
    },
    wrap(node,parent){
        //增加父元素
        dom.before(node,parent)  //将父元素插到节点前面
        dom.append(parent,node)  //将node插到parent(父元素)里面
    },
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
        const {childNodes} = node  //是const childNodes = node.childNodes的简写
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node,name,value){
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
    },
    text(node, string){ // 适配
        if(arguments.length ===2 ){
          if('innerText' in node){
            node.innerText = string 
          }else{
            node.textContent = string 
          }
        }else if(arguments.length === 1){
          if('innerText' in node){
            return node.innerText
          }else{
            return node.textContent
          }
        }
    },
    html(node, string){
        if(arguments.length === 2){
          node.innerHTML = string
        }else if(arguments.length === 1){
          return node.innerHTML 
        }
    },
    style(node, name, value){
        if(arguments.length===3){  // dom.style(div, 'color', 'red')       
            node.style[name] = value
        }else if(arguments.length===2){  // dom.style(div, 'color') 
        if(typeof name === 'string'){         
            return node.style[name]
        }else if(name instanceof Object){  // dom.style(div, {color: 'red'})      
            const object = name
            for(let key in object){
            node.style[key] = object[key]
            }
          }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){
        return (scope||document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)  //删除自身
    },
    next(node){
        let x = node.nextSibling
        while(x&&x.nodeType===3){   //过滤掉文本节点
            x=x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){ //同next
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i=0;i<nodeList;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)  
        let i  
        for(i=0;i<list.length;i++){
          if(list[i] === node){
            break
          }
        }
        return i
    }
}