const { extractMath } = require('../../helpers/string');
const { calculator } = require('../../helpers/math');
const loginSelectors = require('../../selectors/login.json');

module.exports = async function login(page, data) {
  const loginUrl = await page.url();
  const loginForm = await page.waitForSelector(loginSelectors.loginForm);
  const nimInput = await loginForm.$(loginSelectors.nimInput);
  const passwordInput = await loginForm.$(loginSelectors.passwordInput);
  const chaptaQuestionP = await loginForm.$(loginSelectors.chapthaQuestionP);
  const chaptaAnswerInput = await loginForm.$(
    loginSelectors.chapthaAnswerInput
  );

  await nimInput.click();
  await nimInput.type(data.npm);

  await passwordInput.click();
  await passwordInput.type(data.password);

  await page.exposeFunction('extractMath', extractMath);

  const chaptaText = await page.evaluate(
    (el) => extractMath(el.textContent),
    chaptaQuestionP
  );
  const chaptaAnswer = calculator[chaptaText.operator](
    chaptaText.firstValue,
    chaptaText.lastValue
  );

  await chaptaAnswerInput.click();
  await chaptaAnswerInput.type(chaptaAnswer.toString());

  await page.evaluate((form) => form.submit(), loginForm);
  await page.waitForNavigation();

  const currentUrl = await page.url();

  if (currentUrl === loginUrl) {
    throw new Error('Credential invalid');
  }
};
