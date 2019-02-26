import * as React from "react";
import { MainGrid, SubGrid } from "../../basicComponents/Grids";
import SelectField, { AnyOption } from "../../basicComponents/SelectField";
import Bvit from "../instruments/Bvit";
import Hrs from "../instruments/Hrs";
import Rss from "../instruments/Rss";
import Salticam from "../instruments/Salticam";
import {
  IBVIT,
  IHRS,
  IInstrument,
  InstrumentName,
  IRSS,
  ISALT,
  ISalticam
} from "../../../utils/ObservationQueryParameters";

/**
 * Return the form for a given instrument.
 *
 * Parameters:
 * -----------
 * instrument:
 *     The instrument.
 *
 * Returns:
 * --------
 * The form component.
 */
export const saltInstrumentsSwitcher = (
  instrument: IInstrument,
  onChange: (value: any) => void
) => {
  const name = instrument && instrument.name;
  switch (name) {
    case "RSS": {
      return <Rss rss={instrument as IRSS} onChange={onChange} />;
    }
    case "HRS": {
      return <Hrs hrs={instrument as IHRS} onChange={onChange} />;
    }
    case "BVIT": {
      return <Bvit bvit={instrument as IBVIT} onChange={onChange} />;
    }
    case "Salticam": {
      return (
        <Salticam salticam={instrument as ISalticam} onChange={onChange} />
      );
    }
    default:
      return null;
  }
};

interface ISaltFormProps {
  salt: ISALT;
  onChange: (value: any) => void;
}

/**
 * A form for selecting SALT-related search parameters.
 */
const SaltForm = (props: ISaltFormProps) => {
  const { salt, onChange } = props;

  // Function for handling instrument selection
  const changeInstrument = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    onChange({ name: value });
  };

  // Function for handling changes to instrument-related search parameters
  const changeInstrumentParameters = (value: any) => {
    onChange({
      ...salt,
      ...value
    });
  };

  const instruments: InstrumentName[] = ["HRS", "RSS", "BVIT", "Salticam"];

  return (
    <>
      <MainGrid>
        <SubGrid>
          <p>Instrument</p>
          <SelectField name={"instrument"} onChange={changeInstrument}>
            <AnyOption />
            {instruments.map(instrument => (
              <option key={instrument} value={instrument}>
                {instrument}
              </option>
            ))}
          </SelectField>
        </SubGrid>
      </MainGrid>
      {saltInstrumentsSwitcher(salt.instrument, changeInstrumentParameters)}
    </>
  );
};

export default SaltForm;
