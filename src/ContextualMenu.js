import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import i18n from '@dhis2/d2-i18n'
import { useDataEngine } from '@dhis2/app-runtime'
import { Divider, Menu, MenuItem } from '@dhis2/ui-core'

import { apiFetchOrganisationUnit } from './api/organisationUnits'

export const ContextualMenu = ({ config, ouLevels, onClick }) => {
    const engine = useDataEngine()
    const [ouData, setOuData] = useState(undefined)
    const [subLevelData, setSubLevelData] = useState(undefined)

    const lookupLevel = levelId => ouLevels.find(item => item.level === levelId)

    const doFetchOuData = useCallback(
        async ouId => {
            const ouData = await apiFetchOrganisationUnit(engine, ouId)

            return ouData.orgUnits
        },
        [engine]
    )

    useEffect(() => {
        setOuData(null)

        const doFetch = async () => {
            const orgUnit = await doFetchOuData(config.ouId)

            setOuData(orgUnit)
        }

        doFetch()

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [config])

    useEffect(() => {
        setSubLevelData(null)

        if (ouData?.children.length) {
            const levelData = lookupLevel(ouData.children[0].level)

            if (levelData) {
                setSubLevelData(levelData)
            }
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [ouData])

    return (
        <Menu>
            {ouData && (
                <MenuItem label={i18n.t('Org. unit drill down/up')}>
                    <Menu>
                        {subLevelData && (
                            <>
                                <MenuItem
                                    dense
                                    label={i18n.t(
                                        'Show {{level}} level in {{orgunit}}',
                                        {
                                            level: subLevelData.name,
                                            orgunit: ouData.name,
                                        }
                                    )}
                                    onClick={() =>
                                        onClick({
                                            ou: {
                                                id: ouData.id,
                                                level: subLevelData.id,
                                            },
                                        })
                                    }
                                />
                                {ouData?.parent && <Divider />}
                            </>
                        )}
                        {ouData?.parent && (
                            <MenuItem
                                dense
                                label={i18n.t('Show {{orgunit}}', {
                                    orgunit: ouData.parent.name,
                                })}
                                onClick={() =>
                                    onClick({ ou: { id: ouData.parent.id } })
                                }
                            />
                        )}
                    </Menu>
                </MenuItem>
            )}
        </Menu>
    )
}

ContextualMenu.propTypes = {
    config: PropTypes.object,
    ouLevels: PropTypes.array,
    onClick: PropTypes.func,
}

export default ContextualMenu
