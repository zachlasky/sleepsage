import { Button, Checkbox, FloatingLabel } from 'flowbite-react';
import { useRef, useState } from 'react';

import { createMagicLink, createUser } from '@/server-actions/auth';
import { createUserInfo } from '@/server-actions/user-info';

type TRegisterProps = {};

const Register = ({}: TRegisterProps) => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    setIsLoading(true);

    // Create user
    const { id = '', error: createUserError } = await createUser(email);
    if (createUserError) {
      setErrorMessage(createUserError.message);
      setIsLoading(false);
      return;
    }

    // Send magic link to new user email
    const { error: magicLinkError } = await createMagicLink(email);
    if (magicLinkError) {
      setErrorMessage(magicLinkError.message);
      setIsLoading(false);
      return;
    }

    // Store user ID in session storage to be able to save items to new account
    sessionStorage.setItem('SSUID', id || '');

    // Create entry in UserInfo table with userId
    const createUserInfoError = await createUserInfo({
      UserId: id || '',
      SubmissionId: sessionStorage.getItem('SSSID') || '' // Check for existing submission ID in session storage
    });
    if (createUserInfoError) {
      setErrorMessage(createUserInfoError);
      setIsLoading(false);
      return;
    }

    setIsRegistered(true);
    setIsLoading(false);
  };

  const handleEmailChange = (event: React.ChangeEvent) => {
    if (errorMessage !== '') {
      setErrorMessage('');
    }

    setEmail((event.target as HTMLInputElement).value);
  };

  const handleCheckboxChange = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
    }

    setIsAgreed(!isAgreed);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isSubmitDisabled =
    !isAgreed || email.length === 0 || !emailRegex.test(email) || errorMessage.length > 0;

  return (
    <div>
      <>
        <div className="grid gap-8 content-between">
          <div className="grid p-y-4 gap-4">
            <FloatingLabel
              className=" focus:border-darkest-purple bg-black text-lightest-purple max-w-md"
              variant="outlined"
              label="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
              ref={emailInputRef}
              required
            />

            {errorMessage.length > 0 && <p className="text-red-500 text-xs">{errorMessage}</p>}

            <div className="flex justify-between">
              <label className="flex md:items-center gap-3">
                <Checkbox
                  id="accept"
                  color="purple"
                  checked={isAgreed}
                  className="cursor-pointer"
                  onChange={handleCheckboxChange}
                  value="I agree to the Terms of Service and Privacy Statement."
                />
                <p className="text-lightest-purple -m-1">
                  I agree to the{' '}
                  <a className="underline" href="/about#policy" target="_blank">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="underline" href="/about#policy" target="_blank">
                    Privacy Statement
                  </a>
                  .
                </p>
              </label>
            </div>

            <Button
              isProcessing={isLoading}
              onClick={() => handleRegister()}
              color="purple"
              className="w-1/2 mt-8 font-semibold disabled:cursor-not-allowed bg-darkest-purple text-lightest-purple max-w-md"
              type="submit"
              disabled={isSubmitDisabled}>
              Create Account
            </Button>
          </div>
        </div>
      </>
    </div>
  );
};

export { Register };
