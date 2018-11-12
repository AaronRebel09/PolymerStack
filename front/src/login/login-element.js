import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * `login-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginElement extends PolymerElement {
  static get template() {
    // language=HTML
      return html`
          <style>          
              :host {
              display: block;
          }        
          </style>
          
          <iron-ajax id="api" 
                     url="http://localhost:3000/" 
                     method="GET" 
                     handle-as="json"
                     on-response="handleResponse"></iron-ajax>
          
          <h2>[[prop1]]!</h2>
          
          <paper-input label="user" id="user"></paper-input>
          <paper-input label="password" type="password" id="password"></paper-input>
          <paper-button id="button" on-click="validation">Click me !</paper-button>
          
          <h2>Login [[login]]</h2>
          
          <ul>
              <template is="dom-repeat" items="[[elements]]">
                  <li>[[usuarios.user]]</li>
                  <li>[[usuarios.pass]]</li>
              </template>
          </ul>       
          
          <my-app></my-app>
          
      `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'login-element',
      }, element: {
            type: Array,
            value: []
        },usuarios: {
            type: Array,
            value: []
        },
        login:{
          type: Boolean,
            value: false
        }
    };
  }

    validation() {
        console.log("clicked");
        const usuario = this.$.user.value;
        const contra = this.$.password.value;

        const data = {usuario, contra};
        this.$.api.body = JSON.stringify(data);
        console.log('data:', data);
        this.set('element', data);
        this.$.api.generateRequest();
        console.log("after Request");

        // fetch('')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.set('elements', data);
        //     });
    }

    compare( userMon, passMon ){
      const userform = this.element.usuario.toString();
      const passform = this.element.contra.toString();
      if(userMon == userform && passform == passMon ){
          console.log("login succes");
          this.set('login', true);
      }else{
          console.log("login fail");
      }
    }

    handleResponse() {
        const response = this.$.api.lastResponse;
        console.log('response:', response);
        console.log("before usuarios");
        let mongoresp = response;
        for (let mongo of mongoresp){
            console.log(mongo.usu);
            console.log(mongo.pas);
            this.compare(mongo.usu,mongo.pas);
        }

        // this.set('usuarios', response);
        // console.log('usuarios:', this.usuarios);
        // console.log('element:', this.element.usuario.toString());
        // this.usuarios.forEach(function(user, index){
        //     console.log('index:', index);
        //     console.log('user:', user.usu.toString());
        //     console.log('pass:', user.pas.toString());
        //     this.compare(user.usu.toString());
        //     // if(user.usu.toString() === this.element.usuario.toString() ){
        //     //     console.log('login succesfull');
        //     // }else{
        //     //     console.log('fail');
        //     // }
        // });
    }

}

window.customElements.define('login-element', LoginElement);
