import { supabase } from "../utils/supabaseClient";

const basePath = 'http://localhost:3000'
export async function getServerSideProps(req, res) {
  //const { user } = await supabase.auth.api.getUserByCookie(req)
  const response = await fetch(`${basePath}/api/getUser`).then((response) =>
    response.json()
  );

  const { user } = response;

  if (!user) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }
  
  return { props: { user } };
}
export default function Protected({ user }) {
  return (
    <>
      <p>
        // Let's greet the user by their e-mail address
        Welcome {user.email}!{" "}
        <span role="img" aria-label="waving hand">
          👋🏾
        </span>
      </p>
      You are currently viewing a top secret page!
    </>
  );
}