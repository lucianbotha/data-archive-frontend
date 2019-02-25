import * as React from "react";
import {
  ILesedi,
  IOneNineM,
  ISALT,
  ITelescope,
  TelescopeName
} from "../../utils/ObservationQueryParameters";
import { MainGrid, SubGrid } from "../basicComponents/Grids";
import SelectField, { AnyOption } from "../basicComponents/SelectField";
import LesediForm from "./telescopes/LesediForm";
import OneNineMForm from "./telescopes/OneNineM";
import SaltForm from "./telescopes/SaltForm";

const TELESCOPES: TelescopeName[] = ["SALT", "1.9 m", "Lesedi"];

interface ITelescopeFormProps {
  telescope?: ITelescope;
  onChange: (value: any) => void;
}

/**
 * A form for selecting telesvope-related search parameters.
 */
class TelescopeForm extends React.Component<ITelescopeFormProps, {}> {
  render() {
    const { telescope, onChange } = this.props;

    // Function for updating telescope-related parameters
    const changeTelescope = (e: React.FormEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value;
      onChange({
        name: value
      });
    };

    // Function for updating instrument-related properties
    const changeInstrument = (value: any) => {
      onChange({
        ...telescope,
        instrument: {
          ...value
        }
      });
    };

    const name = (telescope && telescope.name) || "";
    return (
      <>
        <MainGrid>
          <SubGrid>
            <p>Telescope</p>
            <SelectField
              name={"telescope"}
              onChange={changeTelescope}
              value={name || ""}
            >
              <AnyOption />
              {TELESCOPES.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectField>
          </SubGrid>
        </MainGrid>
        {name === "SALT" && (
          <SaltForm details={telescope as ISALT} onChange={changeInstrument} />
        )}
        {name === "Lesedi" && (
          <LesediForm
            details={telescope as ILesedi}
            onChange={changeInstrument}
          />
        )}
        {name === "1.9 m" && (
          <OneNineMForm
            details={telescope as IOneNineM}
            onChange={changeInstrument}
          />
        )}
      </>
    );
  }
}

/**
 * Validate the given telescope-related search parameters and, if need be, add
 * error messages to them.
 */
export const validatedTelescope = (telescope?: ITelescope) => {
  if (telescope) {
    return {
      ...telescope,
      errors: {}
    };
  } else {
    return telescope;
  }
};

export default TelescopeForm;
