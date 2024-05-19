import React from 'react';

import Button from '@/components/UI/Button';
import Heading from '@/components/UI/Heading';
import Input from '@/components/UI/Input';
import Stack from '@/components/UI/Stack';
import Layout from '@/layout';

import {useAccountUser, useLogout, useSaveUser} from './hooks';
import styles from './styles';

interface AccountScreenProps {}
const AccountScreen: React.FC<AccountScreenProps> = () => {
  const {user, displayName, setDisplayName} = useAccountUser();

  const saveEvent = useSaveUser({user: {displayName}});

  const logoutEvent = useLogout();

  return (
    <Layout>
      <Heading
        margin
        title="Mi cuenta"
        description="Aquí puedes ver tu información personal."
      />

      <Stack p={3} fullWidth background="white" shadow>
        <Stack fullWidth style={styles.row} pb={2} mb={2}>
          <Input
            placeholder="Nombre"
            onChangeText={setDisplayName}
            value={displayName}
            family="Ionicon"
            icon="person"
          />

          <Input
            placeholder="Correo electrónico"
            value={user?.email}
            color="muted"
            family="Ionicon"
            type="email-address"
            icon="mail"
          />

          <Input
            placeholder="Número de teléfono"
            value={user?.phoneNumber}
            color="muted"
            family="Ionicon"
            icon="call"
          />
        </Stack>

        <Stack fullWidth gap={2}>
          <Button
            outline
            color="theme"
            loading={saveEvent.loading}
            onPress={saveEvent.handler}
            iconFamily="Ionicon"
            icon="log-out">
            Actualizar
          </Button>

          <Button
            color="theme"
            icon="log-out"
            iconFamily="Ionicon"
            onPress={logoutEvent}>
            Cerrar Sesión
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default AccountScreen;
