import Alpine from 'alpinejs';
import { Notify } from 'notiflix';

import css from '../css/style.scss'; //using style-loader for import css and sass-loader for import compile scss/sass file to css
import * as bootstrap from 'bootstrap'; //using after import from scss


window.Alpine = Alpine;

Alpine.data('count', () => ({
    init(){
        document.addEventListener('keyup', (event) => {
            if(event.key >= '0' && event.key <= '9'){
                this.append(event.key);
            }
            ['+', '-', '/', '*', '%', '.'].includes(event.key) && this.append(event.key);
            event.key === 'Enter' && this.compute();
            event.key === 'Backspace' && this.backspace();
            event.key === 'Delete' && this.clear();
        })
    },
    num: '0',
    append(chars){
        if (this.num === '0' && chars != '.' || this.num === 0 && chars != '.') {
            this.num = '';
        }
        this.num += chars;
    },
    clear(){
        this.num = '0';
    },
    backspace(){
        this.num != '0' && (this.num = this.num.slice(0, -1));
        this.num.length <= 0 && (this.num = '0');
    },
    compute(){
        try {
            if(this.num.includes('%')) {
                this.num = this.computePercentage(this.num);
            }else{
                this.num = eval(this.num);
            }
        } catch (error) {
            Notify.warning(`Something wrong!`);
        }
    },
    computePercentage(expression){
        const regex = /(\d+\.?\d*)%?([+\-*/])(\d+\.?\d*)%?/;
        const positiveRegex = /(\d+\.?\d*)([+\-*/])(\d+\.?\d*)%/
        const firstPercentage = expression.match(positiveRegex);
        const secondPercentage = expression.match(regex);
        
        if (firstPercentage) {
            const [ _, num1, operator, num2] = firstPercentage;
            const percentage = (parseFloat(num2) / 100) * parseFloat(num1);
            
            switch (operator) {
                case '+':
                    return (parseFloat(num1) + percentage).toString();
                case '-':
                    return (parseFloat(num1) - percentage).toString();
                case '/':
                    return (parseFloat(num1) / percentage).toString();
                case '*':
                    return (parseFloat(num1) * percentage).toString();
            }
        }else if(secondPercentage){
            const [ _, num1, operator, num2] = secondPercentage;
            const percentage = (parseFloat(num1) / 100);
            console.log(percentage);
            
            switch (operator) {
                case '+':
                    return (parseFloat(num2) + percentage).toString();
                case '-':
                    return (percentage - parseFloat(num2)).toString();
                case '/':
                    return (parseFloat(num2) / percentage).toString();
                case '*':
                    return (parseFloat(num2) * percentage).toString();
            }
        }else {
            return expression;
        }
    }
}));

Alpine.start();
