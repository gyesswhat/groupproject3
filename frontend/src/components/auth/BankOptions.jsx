import { BANK_LIST } from './auth.const';

export const BankOptions = () => (
  <>
    {BANK_LIST.map(bank => (
      <option key={bank} value={bank}>
        {bank}
      </option>
    ))}
  </>
);
