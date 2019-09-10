<template>
  <div class="uk-container-xsmall uk-container">
    <form @submit.prevent="onSubmit" novalidate>
      <fieldset class="uk-fieldset uk-form-stacked">
        <legend class="uk-legend">
          <h2 class="uk-heading-line uk-text-center uk-margin-remove"><span>{{ formSetting.title }}</span></h2>
        </legend>
        <div class="uk-margin form__item" :class="{ 'form__error': $v.email.$error }">
          <label for="email" class="uk-form-label">{{ formSetting.email.label }}</label>
          <div class="uk-form-controls uk-inline uk-display-inline">
              <span class="uk-form-icon" uk-icon="user"></span>
              <input type="email" class="uk-input" :class="{ 'uk-form-danger': $v.email.$error }" id="email" :placeholder="formSetting.email.placeholder" v-model.trim="email" @change.prevent="$v.email.$touch()">
          </div>
          <div v-if="!$v.email.required" class="uk-alert-danger from__alert" uk-alert>
            <p>Необходимо заполнить форму!</p>
          </div>
          <div v-if="!$v.email.email" class="uk-alert-danger from__alert" uk-alert>
            <p>Email не коректно заполнен!</p>
          </div>
        </div>
        <div class="uk-margin form__item" :class="{ 'form__error': $v.password.$error }">
          <label for="password" class="uk-form-label">{{ formSetting.password.label }}</label>
          <div class="uk-form-controls uk-inline uk-display-inline">
            <span class="uk-form-icon" uk-icon="lock"></span>
            <input type="password" class="uk-input" :class="{ 'uk-form-danger': $v.password.$error }" id="password" :placeholder="formSetting.password.placeholder" v-model.trim="password" @change.prevent="$v.password.$touch()">
          </div>
          <div v-if="!$v.password.required" class="uk-alert-danger from__alert" uk-alert>
            <p>Необходимо заполнить форму!</p>
          </div>
          <div v-if="!$v.password.minLength" class="uk-alert-danger from__alert" uk-alert>
            <p>Пароль должен быть не менее {{ $v.password.$params.minLength.min }}-и символов!</p>
          </div>
        </div>
        <div class="uk-margin form__item" :class="{ 'form__error': $v.twoPassword.$error }">
          <label for="two-password" class="uk-form-label">{{ formSetting.twoPassword.label }}</label>
          <div class="uk-form-controls uk-inline uk-display-inline">
            <span class="uk-form-icon" uk-icon="lock"></span>
            <input type="password" class="uk-input" :class="{ 'uk-form-danger': $v.twoPassword.$error }" id="two-password" :placeholder="formSetting.twoPassword.placeholder" v-model.trim="twoPassword" @change.prevent="$v.twoPassword.$touch()">
          </div>
          <div v-if="!$v.twoPassword.required" class="uk-alert-danger from__alert" uk-alert>
            <p>Необходимо заполнить форму!</p>
          </div>
          <div v-if="!$v.twoPassword.sameAsPassword" class="uk-alert-danger from__alert" uk-alert>
            <p>Пароль не совпадает!</p>
          </div>
        </div>
      </fieldset>
      <div class="uk-margin">
        <button class="uk-button uk-button-secondary uk-width-1-1" :disabled="loading"> <div v-if="loading" uk-spinner></div> <span v-else>{{ formSetting.submit }}</span></button>
        <div v-if="submitStatus === 'ERROR'" class="uk-alert-danger" uk-alert>
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
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      formSetting: {
        title: 'Регистрацыя'.toUpperCase(),
        submit: 'отправить'.toUpperCase(),
        email: {
          label: 'email'.toUpperCase(),
          placeholder: 'exampal@gmail.com'
        },
        password: {
          label: 'Пароль'.toUpperCase(),
          placeholder: 'password'
        },
        twoPassword: {
          label: 'Повторите пароль'.toUpperCase(),
          placeholder: 'password'
        }
      },
      email: '',
      password: '',
      twoPassword: '',
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
    },
    twoPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('SIGN_UP', { user: this.email, password: this.password })
          .then(() => {
            this.$router.push('/')
          })
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
