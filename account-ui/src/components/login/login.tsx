import { Button, Checkbox, FloatingLabel, Modal } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { createMagicLink, createUser } from '@/server-actions/auth';
import { createUserInfo } from '@/server-actions/user-info';

type TRegisterProps = {
  handleClose: () => void;
};

const Register = ({ handleClose }: TRegisterProps) => {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (productId: string, supplementId: string) => {
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
      SubmissionId: sessionStorage.getItem('SSSID') || '', // Check for existing submission ID in session storage
      ProductId: productId,
      SupplementId: supplementId
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
    <Modal dismissible initialFocus={emailInputRef} onClose={handleClose} show>
      <Modal.Header className="bg-gradient-to-r from-default-gray to-black">
        <span className="text-lightest-purple">
          Create a <span className="font-bold">FREE </span> Account
        </span>
      </Modal.Header>

      {!isRegistered ? (
        <>
          <Modal.Body className="grid gap-8 content-between justify-center bg-gradient-to-r from-default-gray to-black">
            <div>
              <div className="block">
                <FloatingLabel
                  className="border-dark-purple focus:border-darkest-purple text-lightest-purple"
                  variant="standard"
                  label="Enter Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  ref={emailInputRef}
                  required
                />
              </div>

              {errorMessage.length > 0 && <p className="text-red-500 text-xs">{errorMessage}</p>}
            </div>

            <div className="grid justify-center">
              <Image src="/register.svg" alt="Register" width={500} height={500} />
            </div>
          </Modal.Body>

          <Modal.Footer className="flex justify-center bg-gradient-to-r from-default-gray to-black">
            <Button
              onClick={() => router.push('/account')}
              color="blue"
              className="w-1/2 text font-semibold"
              type="submit">
              Already have an account? Log In
            </Button>
            <Button
              isProcessing={isLoading}
              onClick={() => handleRegister(productId, supplementId)}
              color="purple"
              className="w-1/2 text font-semibold disabled:cursor-not-allowed bg-darkest-purple text-lightest-purple"
              type="submit"
              disabled={isSubmitDisabled}>
              Create Account
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body className="grid gap-8 content-evenly justify-items-center bg-gradient-to-r from-default-gray to-black">
            <p className="text-2xl text-default-purple">Check your email for a login link!</p>

            <div className="grid justify-center">
              <Image src="/email.svg" alt="Email" width={500} height={500} />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-center bg-gradient-to-r from-default-gray to-black">
            <Button
              onClick={handleClose}
              color="purple"
              className="w-1/2 text font-semibold bg-darkest-purple text-lightest-purple"
              type="submit">
              Done
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export { Register };
