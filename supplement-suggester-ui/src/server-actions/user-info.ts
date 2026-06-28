type TUpdateUserInfoBody = {
  UserId: string;
  ProductId: string;
  SupplementId: string;
};

type TCreateUserInfoBody = TUpdateUserInfoBody & {
  SubmissionId?: string;
};

const createUserInfo = async ({
  UserId,
  ProductId,
  SupplementId,
  SubmissionId = ''
}: TCreateUserInfoBody): Promise<string> => {
  const url = `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/user-info`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserId, ProductId, SupplementId, SubmissionId })
    });

    if (!response.ok) {
      console.log('response', response);
      console.error('Error in createUserInfo:', response.status);
      return `There was an error creating your account`;
    }

    return '';
  } catch (error) {
    console.error(error);
    return `There was an error creating your account`;
  }
};

const updateUserInfoSavedItems = async ({
  UserId,
  ProductId,
  SupplementId
}: TUpdateUserInfoBody): Promise<string> => {
  const url = `${process.env.NEXT_PUBLIC_SUGGESTER_SERVICE_API_URL}/user-info/${UserId}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ProductId, SupplementId })
    });

    if (!response.ok) {
      console.error('Error in updateUserInfoSavedItems:', response.status);
      return `There was an error saving your item`;
    }

    return '';
  } catch (error) {
    console.error(error);
    return `There was an error saving your item`;
  }
};

export { createUserInfo, updateUserInfoSavedItems };
