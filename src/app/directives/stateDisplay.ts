/**
 * A directive class written in TypeScript.
 */
class StateDisplayDirective {

    private template;
    private restrict;
    private replace;
    private scope;
    private $interval;
    private states;

    constructor($interval, states) {
        this.template = '<div class="state-label">{{ prefix }} {{ currentState }}</div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            start: '='
        };

        this.$interval = $interval;
        this.states = states;
    }

    link(scope) {

        scope.prefix = this.states.getPrefix();
        scope.currentState = this.states.getNextState();

        scope.$watch('start', (val) => {
            if (val) {
                this.$interval(() => scope.currentState = this.states.getNextState(), 3000);
            }
        });

    }
}

/**
 * Declare the register object in order to avoid TypeScript compiler errors.
 */
declare module register {
    export function directive(name: string, constructorFn: any);
}

register.directive('stateDisplay', StateDisplayDirective);