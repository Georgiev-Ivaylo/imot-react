import Input from "components/common/form/Input";
import Select from "components/common/form/Select";
import Textarea from "components/common/form/Textarea";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageContext } from "utils/context";
import { useHttpService } from "utils/HttpService";

const EstateManage = () => {
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { fetchData } = useHttpService("/estates/form");
  const { createRecord, editRecord } = useHttpService("/estates");
  // const { error } = useContext(MessageContext);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setFormFields(data));
  }, []);
  console.log(formFields);

  if (formFields.length === 0) {
    return <h2>Loading...</h2>;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    let formErrors = null;
    if (location.state) {
      formErrors = await editRecord(formData, "/" + location.state.id);
    } else {
      formErrors = await createRecord(formData);
    }

    console.log(formErrors);
    if (formErrors) {
      setErrors(formErrors);
    }

    setLoading(false);
    console.log(formData);
    // authenticateUser(formData, setErrors, setLoading);
  }

  return (
    <div className="side-card-grid">
      {location.state && <h1 className="title">Estate manage</h1>}
      {!location.state && <h1 className="title">New estate</h1>}
      <form onSubmit={onSubmit}>
        <div className="large-form">
          {formFields.map((field) => {
            if (field.type === "textarea") {
              return (
                <Textarea
                  label={field.label}
                  name={field.name}
                  alterClass="md:col-span-2 lg:col-span-3"
                  value={location.state?.[field.name]}
                  error_msg={errors?.[field.name]}
                />
              );
            }

            if (field.type === "select") {
              return (
                <Select
                  label={field.label}
                  name={field.name}
                  value={location.state?.[field.name]}
                  error_msg={errors?.[field.name]}
                  options={field.options}
                />
              );
            }

            return (
              <Input
                type={field.type}
                label={field.label}
                name={field.name}
                value={location.state?.[field.name]}
                error_msg={errors?.[field.name]}
              />
            );
          })}
          {/* <Input
            type="text"
            label="Price"
            name="price"
            value={location.state?.price}
            error_msg={errors?.price}
          />
          <Select
            label="Currency"
            name="currency_code"
            value={location.state?.currency_code}
            error_msg={errors?.currency_code}
            options={["BGN", "EUR", "USD"]}
          />
          <Input
            type="text"
            label="Region"
            name="region"
            value={location.state?.region}
            error_msg={errors?.region}
          />
          <Input
            type="text"
            label="City"
            name="city"
            value={location.state?.city}
            error_msg={errors?.city}
          />
          <Input
            type="text"
            label="Village"
            name="village"
            value={location.state?.village}
            error_msg={errors?.village}
          />
          <Input
            type="text"
            label="District"
            name="district"
            value={location.state?.district}
            error_msg={errors?.district}
          />
          <Input
            type="text"
            label="Type"
            name="type"
            value={location.state?.type}
            error_msg={errors?.type}
          />
          <Input
            type="text"
            label="Construction type"
            name="construction_type"
            value={location.state?.construction_type}
            error_msg={errors?.construction_type}
          />
          <Input
            type="text"
            label="Land"
            name="land_size"
            value={location.state?.land_size}
            error_msg={errors?.land_size}
          />
          <Input
            type="text"
            label="Building"
            name="building_size"
            value={location.state?.building_size}
            error_msg={errors?.building_size}
          />
          <Input
            type="text"
            label="Rooms"
            name="rooms"
            value={location.state?.rooms}
            error_msg={errors?.rooms}
          />
          <Input
            type="text"
            label="Bathrooms"
            name="bathrooms"
            value={location.state?.bathrooms}
            error_msg={errors?.bathrooms}
          />
          <Input
            type="text"
            label="Floors"
            name="floors"
            value={location.state?.floors}
            error_msg={errors?.floors}
          />
          <Input
            type="text"
            label="Floor number"
            name="floor_number"
            value={location.state?.floor_number}
            error_msg={errors?.floor_number}
          />
          <Input
            type="text"
            label="Builded at"
            name="construction_date"
            value={location.state?.construction_date}
            error_msg={errors?.construction_date}
          />
          <Textarea
            type="text"
            label="Description"
            name="description"
            alterClass="md:col-span-2 lg:col-span-3"
            value={location.state?.description}
            error_msg={errors?.description}
          /> */}
        </div>
        {errors && <p className="description-error">{errors.message}</p>}
        <div className="side-card-nav">
          <span></span>
          <button type="submit" className="form-btn">
            {loading ? "Loading" : location.state ? "Edit" : "Add"}
          </button>
          <Link to={"../"} className="side-card-btn">
            Back
          </Link>
          <span></span>
        </div>
      </form>
    </div>
  );
};

export default EstateManage;
