export default function AdminDashboard() {
    const { data: session } = useSession()
    // session is always non-null inside this page, all the way down the React tree.
    return 
    (
      <>
      <p>Some super secret dashboard</p>
      <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  AdminDashboard.auth = {
    role: "admin",
    loading: <AdminLoadingSkeleton />,
    unauthorized: "/countries", // redirect to this url
  }