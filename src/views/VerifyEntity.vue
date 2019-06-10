<template>
  <v-container class="c-container-dashboard c-container-dashboard--small">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12
        class="c-dashboard-title"
      >
        <h2>Ficha de verificación de entidad</h2>
      </v-flex>
    </v-layout>
    <form class="c-verify-entity">
      <div class="c-verify-entity__row">
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

      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
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
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
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
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
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
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Confirmación y protección de datos</h3>

          <v-radio-group v-model="conditions" class="c-verify-entity__radios">
            <v-radio label="Terminos y condiciones" value="accept"></v-radio>
            <p>El responsable de la organización, recoge estos datos a través de Google Forms para ser ingresada  en la base de datos de Empresarios por la Educación.</p>
            <p>Al marcar la casilla de aceptación da pleno consentimiento. Puedes ver su politica de privacidad en y los terminos y condiciones.</p>
          </v-radio-group>
        </div>
      </div>
    </form>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
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
      let program = {
        id: null,
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
