//------- tmp 
// const config = {
//     initial: 'normal',
//     states: {
//         normal: {
//             transitions: {
//                 study: 'busy',
//             }
//         },
//         busy: {
//             transitions: {
//                 get_tired: 'sleeping',
//                 get_hungry: 'hungry',
//             }
//         },
//         hungry: {
//             transitions: {
//                 eat: 'normal'
//             },
//         },
//         sleeping: {
//             transitions: {
//                 get_hungry: 'hungry',
//                 get_up: 'normal',
//             },
//         },
//     }
// };
//-----


class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if (! config){
            throw new Error('Undefined FSM Config ');
        }

        this.state = config.initial;
        this.config = config;
        this.history = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {

        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        
        let stateFound = false;
        for (let st in this.config.states){
            if(st == state){
                stateFound = true;
                break;
            }            
        }
        
        if(! stateFound) throw new Error( `State '${state}' not found`);

        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        
        let evenForStateFound = false;
        for(let ev in this.config.states[this.state].transitions){

            if(ev == event){
                evenForStateFound = true;
                this.state = this.config.states[this.state].transitions[ev];
                break;
            }
        }

        if (!evenForStateFound) throw new Error(`Event ${event} not found for current state`);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        
        let retVal = [];
        
        for (let st in this.config.states){
            if( !event ){
                retVal.push(st);
                continue;
            }
            
            for(let ev in this.config.states[st].transitions){

                if(ev == event){
                    retVal.push(st);    
                }
            }
        }
        
        return retVal;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 0;
    }
}

 //const student = new FSM(config);
 //student.trigger('study');
 //student.trigger('hmmm... exception?');
 //console.log(ev + ' ' + this.config.states[this.state].transitions[ev] );
 //student.trigger();
 //student.changeState('busy');
 //student.trigger();

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
