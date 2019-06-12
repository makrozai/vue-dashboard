<template>
  <v-container class="c-container-dashboard c-container-dashboard--small">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12
        class="c-dashboard-title mb-4"
      >
        <h2>Ficha de verificación de entidad</h2>
      </v-flex>
    </v-layout>
    <form class="c-verify-entity">
      <div class="c-verify-entity__row mb-5">
        <div class="c-verify-entity__row-small">
          <label class="c-verify-entity__upload">
            <img :src="fileImage" alt="">
            <p>Formato válido (jpg, png), máximo 20MB</p>
            <input type="file" name="" @change="updateLocal" ref="myFiles">
          </label>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="razonComercial"
                v-validate="'required'"
                :error-messages="errors.collect('razonComercial')"
                label="Razón comercial o nombre de la organización"
                data-vv-name="razonComercial"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                  v-model="ruc"
                  v-validate="'required|integer'"
                  :error-messages="errors.collect('Ruc')"
                  label="Ruc"
                  data-vv-name="Ruc"
                  required
                  box
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md8>
              <v-text-field
                v-model="razonSocial"
                v-validate="'required'"
                :error-messages="errors.collect('razonSocial')"
                label="Razón social"
                data-vv-name="razonSocial"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
        </div>
      </div>

      <span class="c-verify-entity__spacer"></span>

      <!--@ informacion de entidad-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section complete">
            <span>1</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <h3 class="c-verify-entity__title">Información de la entidad</h3>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="tipoRubro"
                :items="tipoRubroItems"
                v-validate="'required'"
                :error-messages="errors.collect('tipoRubro')"
                label="Seleccione tipo de rubro"
                data-vv-name="tipoRubro"
                required
                box
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="tipoEntidad"
                :items="tipoEntidadItems"
                v-validate="'required'"
                :error-messages="errors.collect('tipoEntidad')"
                label="Tipo de entidad"
                data-vv-name="tipoEntidad"
                required
                box
              ></v-select>
            </v-flex>
            <div class="c-verify-entity__inputs-equals">
              <v-flex xs6>
                <v-textarea
                  box
                  label="Direccion de oficina"
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-select
                  v-model="departamento"
                  :items="departamentoItems"
                  v-validate="'required'"
                  :error-messages="errors.collect('departamento')"
                  label="Seleccione departamento"
                  data-vv-name="departamento"
                  required
                  box
                ></v-select>
                <v-select
                  v-model="provincia"
                  :items="provinciaItems"
                  v-validate="'required'"
                  :error-messages="errors.collect('provincia')"
                  label="Seleccione provincia"
                  data-vv-name="provincia"
                  required
                  box
                ></v-select>
                <v-select
                  v-model="distrito"
                  :items="distritoItems"
                  v-validate="'required'"
                  :error-messages="errors.collect('distrito')"
                  label="Seleccione distrito"
                  data-vv-name="distrito"
                  required
                  box
                ></v-select>
              </v-flex>
            </div>
          </v-layout>
        </div>
      </div>
      <!--@ informacion de entidad-->

      <!--@ informacion de contacto-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section">
            <span>2</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Información contacto directo con Empresarios por la educación</h3>

          <v-layout wrap v-for="(perfil, index) in perfilContact" :key="index">
            <v-flex xs12 class="mt-4" v-if="index > 0">
              <h3 class="c-verify-entity__subtitle">Información del contacto {{ index + 1 }}</h3>
              <v-divider class="mt-3 mb-4"></v-divider>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                v-model="perfil.name"
                v-validate="'required'"
                :error-messages="errors.collect('perfilName')"
                label="Nombre Completo"
                data-vv-name="perfilName"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                v-model="perfil.lastName"
                v-validate="'required'"
                :error-messages="errors.collect('perfilLastName')"
                label="Apellido"
                data-vv-name="perfilLastName"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                v-model="perfil.position"
                v-validate="'required'"
                :error-messages="errors.collect('perfilPosition')"
                label="cargo"
                data-vv-name="perfilPosition"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                v-model="perfil.dni"
                v-validate="'required|integer'"
                :error-messages="errors.collect('perfilDni')"
                label="DNI"
                data-vv-name="perfilDni"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <p class="c-verify-entity__subtitle">Indicanos datos de contacto para la validación y contacto de la cuenta</p>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="perfil.mail"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="Correo electrónico"
                data-vv-name="email"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="perfil.phone"
                v-validate="'required|integer'"
                :error-messages="errors.collect('perfilCelular')"
                label="Nº Celular"
                data-vv-name="perfilCelular"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                v-model="perfil.telephone"
                v-validate="'required|integer'"
                :error-messages="errors.collect('perfilTelephone')"
                label="Nº Fijo"
                data-vv-name="perfilTelephone"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                v-model="perfil.annexed"
                v-validate="'required|integer'"
                :error-messages="errors.collect('perfilAnnexed')"
                label="Anexo"
                data-vv-name="perfilAnnexed"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="c-verify-entity__add-contact">
            <v-btn fab dark  color="primary" @click="addContact">
              <v-icon dark>add</v-icon>
            </v-btn>
            <span>Agregar otro contacto</span>
          </div>

        </div>
      </div>
      <!--@ informacion de contacto-->

      <!--@ registro de programa-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section">
            <span>3</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Programas</h3>
          <p class="c-verify-entity__subtitle">Ingresa minimo un programa</p>

          <span class="c-verify-entity__span">Entidades beneficiadas</span>
          <div class="c-verify-entity__add-program">
            <div class="c-verify-entity__add-program__item" v-for="(program, index) in programs" :key="index">
              <img :src="program.image" alt="">
              <div class="information">
                <p>{{ program.name }} {{ index }}</p>
                <span>{{ program.from.day }} {{ program.from.mounth }} {{ program.from.year }} hasta la actualidad</span>
              </div>
              <v-btn
                fab
                small
                outline
                color="error"
                @click="removeProgram(index)"
              >
                <v-icon dark>remove</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="c-verify-entity__add-contact">
            <v-btn fab color="primary" @click="addProgram">
              <v-icon>add</v-icon>
            </v-btn>
            <span>Agregar otro contacto</span>
          </div>

        </div>
      </div>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <div class="c-form-program c-form-program--dialog">
          <v-card class="c-form-program__card">
            <v-card-title>
              <v-container class="pb-0">
                <h2>PROGRAMA</h2>
              </v-container>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-container grid-list-md class="py-0">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      disabled
                      v-model="program.name"
                      v-validate="'required'"
                      :error-messages="errors.collect('empresa creadora')"
                      label="Empresa u operador (creadora de la iniciativa)"
                      data-vv-name="empresa creadora"
                      required
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <h3>¿El programa es propio?</h3>
                  </v-flex>
                  <v-flex xs6>
                    <div
                      class="c-program-type"
                      :class="program.type == 'propio' ? 'active':''"
                      @click="changeTypeProgram('propio')"
                    >
                      <i class="icon-huella"></i>
                      <p>
                        Propia<br>
                        El programa es de mi propia autoria como Entidad y esta registrada
                      </p>
                    </div>
                  </v-flex>
                  <v-flex xs6>
                    <div
                      class="c-program-type"
                      :class="program.type == 'convenio' ? 'active':''"
                      @click="changeTypeProgram('convenio')"
                    >
                      <i class="icon-archivo"></i>
                      <p>
                        En convenio<br>
                        El programa le pertenece a un grupo de Entidades
                      </p>
                    </div>
                  </v-flex>
                  <!--@ formulario de programa propio-->
                  <v-flex xs12 class="mt-4">
                    <form-program-own></form-program-own>
                  </v-flex>
                  <!--@ formulario de programa propio-->
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>

          <div class="c-form-program__footer">
            <v-btn large color="primary">Guardar</v-btn>
          </div>
        </div>
      </v-dialog>
      <!--@ registro de programa-->

      <!--@ terminos y condiciones-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section c-verify-entity__section--final">
            <span>4</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Confirmación y protección de datos</h3>

          <v-radio-group v-model="conditions" class="c-verify-entity__radios">
            <v-radio label="Terminos y condiciones" value="accept" color="primary"></v-radio>
            <p>El responsable de la organización, recoge estos datos a través de Google Forms para ser ingresada  en la base de datos de Empresarios por la Educación.</p>
            <p>Al marcar la casilla de aceptación da pleno consentimiento. Puedes ver su politica de privacidad en y los terminos y condiciones.</p>
          </v-radio-group>

          <vue-recaptcha sitekey="6LcIM6cUAAAAAFuysxLaVyFwlzCQjqmLcXo8a0W2" class="mb-4"></vue-recaptcha>

          <v-btn color="primary" large class="c-verify-entity__submit">Registrate</v-btn>
        </div>
      </div>
      <!--@ terminos y condiciones-->
    </form>
  </v-container>
</template>

<script>
import formProgramOwn from '../components/formProgramOwn'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha, formProgramOwn },
  data () {
    return {
      program: {
        name: 'RUC 234523432 EMPRESARIOS POR LA EDUCACIÓN',
        type: 'propio'
      },

      dialog: false,
      distritoItems: ['a', 'b', 'c', 'd'],
      provinciaItems: ['a', 'b', 'c', 'd'],
      departamentoItems: ['a', 'b', 'c', 'd'],
      tipoRubroItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      tipoEntidadItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      departamento: '',
      provincia: '',
      distrito: '',
      tipoRubro: '',
      tipoEntidad: '',
      ruc: '',
      razonSocial: '',
      razonComercial: '',
      // eslint-disable-next-line
      fileImage: require('../assets/default-img.svg'),
      perfilContact: [
        {
          name: '',
          lastName: '',
          position: '',
          dni: null,
          mail: '',
          phone: null,
          telephone: null,
          annexed: null
        }

      ],
      programs: [
        {
          id: 1,
          // eslint-disable-next-line
          image: require('../assets/default-img.svg'),
          name: 'Proyecto de educación APC',
          from: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          },
          to: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          }
        }
      ],
      conditions: false
    }
  },
  methods: {
    updateLocal () {
      console.log(this.$refs.myFiles.files[0])
      const file = this.$refs.myFiles.files[0]
      this.fileImage = URL.createObjectURL(file)
    },
    addContact () {
      let contact = {
        name: '',
        lastName: '',
        position: '',
        dni: null,
        mail: '',
        phone: null,
        telephone: null,
        annexed: null
      }
      this.perfilContact.push(contact)
    },
    addProgram () {
      this.dialog = true
      let program = {
        id: null,
        // eslint-disable-next-line
        image: require('../assets/default-img.svg'),
        name: 'Proyecto de educación APC',
        from: {
          day: 3,
          mounth: 'Febrero',
          year: 2017
        },
        to: {
          day: 3,
          mounth: 'Febrero',
          year: 2017
        }
      }
      this.programs.push(program)
    },
    removeProgram (index) {
      this.programs.splice(index, 1)
    },
    changeTypeProgram (type) {
      this.program.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
