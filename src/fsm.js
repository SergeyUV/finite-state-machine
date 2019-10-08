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
        this.histPointer=0;
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
        
        //update history
        this.history.length = this.histPointer;
        this.history.push(this.state);
        this.histPointer++;
        
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

                //update history
                this.history.length = this.histPointer;
                this.history.push(this.state);
                this.histPointer++;

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
    undo() {

        if( this.histPointer > 0 ){

            if(this.histPointer == this.history.length){
                this.history[this.histPointer] = this.state;
            }            
            this.state = this.history[--this.histPointer];
            
            return true;
        }

        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        
        if( this.histPointer < this.history.length-1 && this.histPointer >= 0 ){
            this.state = this.history[++this.histPointer];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 0;
        this.histPointer = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
