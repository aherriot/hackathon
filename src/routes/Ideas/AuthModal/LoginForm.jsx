// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'
import classnames from 'classnames'

// Our inner form component which receives our form's state and updater methods as props
const InnerLoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  auth,
  actions
}) => {
  const cslError = touched.csl && errors.csl
  const firstNameError = touched.firstName && errors.firstName
  const lastNameError = touched.lastName && errors.lastName

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <div className="form__group">
          <label htmlFor="csl">CSL</label>
          <input
            type="text"
            id="csl"
            name="csl"
            className={classnames({ form__error: cslError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.csl}
            autoFocus
          />
          {cslError && <div className="error">{errors.csl}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={classnames({ form__error: firstNameError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {firstNameError && <div className="error">{errors.firstName}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={classnames({ form__error: lastNameError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {lastNameError && <div className="error">{errors.lastName}</div>}
        </div>

        {errors._generic && <div className="error">{errors._generic}</div>}
      </div>

      <div className="form__button-row">
        <button
          type="submit"
          className="button button-primary"
          disabled={!isValid || isSubmitting}>
          Sign In
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const LoginForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ csl: '', firstName: '', lastName: '' }),

  validate: (values, props) => {
    let errors = {}

    if (!values.csl) {
      errors.csl = 'CSL is required'
    }

    if (!values.firstName) {
      errors.firstName = 'First name is required'
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .login(values.csl, values.firstName + ' ' + values.lastName)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeAuthModal()
        props.actions.fetchScores()
      })
      .catch(error => {
        setErrors({ _generic: error.message || 'Unknown Error' })
        setSubmitting(false)
      })
  }
})(InnerLoginForm)

export default LoginForm
