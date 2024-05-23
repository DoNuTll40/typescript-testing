import useAuth from "../../hooks/useAuth";
import Dashboard from "../Dashboard";
import TableShowSubjects from "../TableShowSubjects";
import TableShowUser from "../TableShowUser";

function Home() {
  const { user } = useAuth()!;
  return (
    <div className="mt-2">
        {user !== null ? (
          <>
            <Dashboard />
            <hr />
          </>
        ) : (
          ""
        )}
        <div className={`my-5 px-10`}>
          {user !== null ? (
            <div className="flex gap-10 justify-center mx-auto">
              <TableShowUser />
              <TableShowSubjects />
            </div>
          ) : (
            "Homepage"
          )}
        </div>
    </div>
  );
}

export default Home;
