// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'
import classnames from 'classnames'

// Our inner form component which receives our form's state and updater methods as props
const InnerIdeaForm = ({
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
  const descriptionError = touched.description && errors.description

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <div className="form__group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="10"
            className={classnames({ form__error: descriptionError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            autoFocus
          />
          {descriptionError && (
            <div className="error">{errors.description}</div>
          )}
        </div>

        <div className="form__group">
          <input
            type="checkbox"
            id="join"
            name="join"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.join}
          />
          <label htmlFor="join" className="form__label">
            Join this team
          </label>
          <p>
            You are free to suggest ideas even if you don't participate in that
            idea.
          </p>
        </div>

        {errors._generic && <div className="error">{errors._generic}</div>}
      </div>

      <div className="form__button-row">
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting}>
          Suggest
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const IdeaForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ description: '', join: true }),

  validate: (values, props) => {
    let errors = {}

    if (!values.description) {
      errors.description = 'Description is required'
    } else if (values.description.length > 1000) {
      errors.description = 'Description is too long.'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .addIdea(values)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeIdeaModal()
      })
      .catch(error => {
        setErrors({ _generic: error.message || 'Unknown Error' })
        setSubmitting(false)
      })
  }
})(InnerIdeaForm)

export default IdeaForm
