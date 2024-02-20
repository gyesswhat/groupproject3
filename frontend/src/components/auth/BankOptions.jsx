import { BANK_LIST } from './auth.const';

export const BankOptions = () => (
  <>
    {BANK_LIST.map((bank, index) => (
      <option key={index} value={bank}>
        {bank}
      </option>
    ))}
  </>
);
