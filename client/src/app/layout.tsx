import {RoomStoreProvider} from "@/Stores/Providers/RoomStoreProvider";
import {UserStoreProvider} from "@/Stores/Providers/UserStoreProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <UserStoreProvider>
       <RoomStoreProvider>
        {children}
       </RoomStoreProvider>
      </UserStoreProvider>
      </body>
    </html>
  );
}
