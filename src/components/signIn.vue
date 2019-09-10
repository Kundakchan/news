<template>
  <div class="uk-container-xsmall uk-container">
    <form @submit.prevent="onSubmit" novalidate>
      <fieldset class="uk-fieldset uk-form-stacked">
        <legend class="uk-legend">
          <h2 class="uk-heading-line uk-text-center uk-margin-remove"><span>{{ settingForm.title }}</span></h2>
        </legend>
        <div class="uk-margin form__item" :class="{ 'form__error': $v.email.$error }">
          <label for="email" class="uk-form-label">{{ settingForm.email.label }}</label>
          <div class="uk-form-controls uk-inline uk-display-inline">
            <span class="uk-form-icon" uk-icon="user"></span>
            <input type="email" class="uk-input" id="email" :placeholder="settingForm.email.placeholder" v-model="email" @change="$v.email.$touch()" :class="{ 'uk-form-danger': $v.email.$error }">
          </div>
          <div v-if="!$v.email.required" class="uk-alert-danger from__alert" uk-alert>
            <p>Необходимо заполнить форму!</p>
          </div>
          <div v-if="!$v.email.email" class="uk-alert-danger from__alert" uk-alert>
            <p>Email не коректно заполнен!</p>
          </div>
        </div>
        <div class="uk-margin form__item" :class="{ 'form__error': $v.password.$error }">
          <label for="password" class="uk-form-label">{{ settingForm.password.label }}</label>
          <div class="uk-form-controls uk-inline uk-display-inline">
            <a href="#" v-if="statusLook" @click.prevent="look" class="uk-form-icon" uk-icon="lock"></a>
            <a href="#" v-else @click.prevent="look" class="uk-form-icon" uk-icon="unlock"></a>
            <input ref="email" type="password" class="uk-input" id="password" :placeholder="settingForm.password.placeholder" v-model.trim="password" @change="$v.password.$touch()" :class="{ 'uk-form-danger': $v.password.$error }">
          </div>
          <div v-if="!$v.password.required" class="uk-alert-danger from__alert" uk-alert>
            <p>Необходимо заполнить форму!</p>
          </div>
          <div v-if="!$v.password.minLength" class="uk-alert-danger from__alert" uk-alert>
            <p>Пароль должен быть не менее {{ $v.password.$params.minLength.min }}-и символов!</p>
          </div>
        </div>
      </fieldset>
      <div class="uk-margin">
        <button type="submit" class="uk-button uk-button-secondary uk-width-1-1" :disabled="loading"> <div v-if="loading" uk-spinner></div> <span v-else>{{ settingForm.submit }}</span></button>
        <div v-if="submitStatus === 'ERROR'" class="uk-alert-danger from__alert" uk-alert>
          <p>Заполните форму!</p>
        </div>
        <div v-if="errorMessage !== null" class="uk-alert-danger" uk-alert>
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      settingForm: {
        title: 'АВТОРИЗАЦИЯ'.toUpperCase(),
        submit: 'отправить'.toUpperCase(),
        email: {
          label: 'email'.toUpperCase(),
          placeholder: 'exampal@gmail.com'
        },
        password: {
          label: 'Пароль'.toUpperCase(),
          placeholder: 'password'
        }
      },
      statusLook: true,
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('SIGN_IN', { email: this.email, password: this.password })
          .then(() => {
            this.$router.push('/')
          })
      }
    },
    look () {
      this.statusLook = !this.statusLook
      if (this.statusLook) {
        this.$refs.email.type = 'password'
      } else {
        this.$refs.email.type = 'text'
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.getProcessing
    },
    errorMessage () {
      return this.$store.getters.getError
    }
  }
}
</script>

<style lang="scss" scoped>
.form__item {
  a {
    outline: none;
  }
  .from__alert {
    display: none
  }
  &.form__error {
    .from__alert {
      display: block;
    }
  }
}
</style>
