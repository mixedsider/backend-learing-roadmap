const { hash, compare } = require('../../src/utils/password.util');

describe('Password Util - Unit Test', () => {
  it('비밀번호를 해싱해야 한다', async () => {
    const plain  = 'mypassword123';
    const hashed = await hash(plain);

    expect(hashed).not.toBe(plain);
    expect(hashed).toMatch(/^\$2b\$/); // bcrypt 해시 형식
  });

  it('올바른 비밀번호는 true를 반환해야 한다', async () => {
    const plain  = 'mypassword123';
    const hashed = await hash(plain);
    const result = await compare(plain, hashed);

    expect(result).toBe(true);
  });

  it('틀린 비밀번호는 false를 반환해야 한다', async () => {
    const hashed = await hash('correct');
    const result = await compare('wrong', hashed);

    expect(result).toBe(false);
  });
});
