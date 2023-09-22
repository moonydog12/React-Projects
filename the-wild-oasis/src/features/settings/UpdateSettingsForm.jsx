import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSettings'
import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings()
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings
  const { isUpdating, updateSetting } = useUpdateSetting()

  const handleUpdate = (e, field) => {
    const { value } = e.target

    if (!value) return
    updateSetting({ [field]: value })
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
