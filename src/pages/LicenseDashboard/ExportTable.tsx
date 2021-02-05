import React from 'react';

type Props = {
  filteredAccesses: LicenseAPI.IResponseLicenseDataByDay;
  selectedDate: string;
};

function ExportTable({ filteredAccesses, selectedDate }: Props): JSX.Element {
  return (
    <>
      <table id='acessos-xls' style={{ display: 'none' }}>
        <tbody>
          <table>
            <tr>
              <th
                colSpan={3}
                rowSpan={3}
                style={{
                  textAlign: 'center',
                  backgroundColor: '#1A70BA',
                  color: 'white',
                }}
              >
                Relatório de acessos por dia
              </th>
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td>Data: </td>
              <td>{selectedDate}</td>
            </tr>
            <tr>
              <td>Total: </td>
              <td>
                {Object.keys(filteredAccesses).length > 0
                  ? Object.keys(filteredAccesses)
                      .map((group) => filteredAccesses[group].length)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue
                      )
                  : 0}
              </td>
            </tr>
            <tr />
            {Object.keys(filteredAccesses).map((group) => (
              <>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#F4F7FA',
                    }}
                  >
                    {group}
                  </td>
                </tr>
                <tr>
                  <td>LOGIN</td>
                  <td>HORÁRIO LOGIN</td>
                  <td>HORÁRIO LOGOUT</td>
                </tr>
                {filteredAccesses[group].map((infos) => (
                  <tr>
                    <td>{infos.LoginRecuperador}</td>
                    <td
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {infos.HorarioLogin}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {infos.HorarioLogout}
                    </td>
                  </tr>
                ))}
                <tr />
              </>
            ))}
          </table>
        </tbody>
      </table>
    </>
  );
}

export default ExportTable;
