import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

const formValidationMessage = 'This field is required'

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()
  const isWorking = isCreating || isEditing

  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const { errors } = formState

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        },
      )
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        },
      )
    }
  }

  const onError = () => {
    // console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register('name', {
            required: formValidationMessage,
          })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: formValidationMessage,
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: formValidationMessage,
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: formValidationMessage,

            //  custom validation func
            validate: (value) => {
              return (
                parseInt(value, 10) <= getValues().regularPrice ||
                'Discount should be less than regular price'
              )
            },
          })}
        />
      </FormRow>

      <FormRow label={'Description for website'} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: formValidationMessage,
          })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : formValidationMessage,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
