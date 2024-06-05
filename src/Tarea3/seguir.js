<Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/Wpq35kR/DUCA-DECLARACI-N-NICA-CENTROAMERICANA.png"
                alt="Encabezado de la carta"
            />

            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={valueTabs}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#e5e1fa", color: 'black' }}
                    >
                        <Tab
                            label="Asignar DEVAS a la DUCA"
                            {...a11yProps(0)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="Identificación de la declaración"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="Declarante, Transportista y Conductor"
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="Mercancías y Documentos de soporte"
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab4}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={valueTabs}
                    onChangeIndex={handleChangeIndex}
                >
                    <form onSubmit={handleSubmitDevas((_data) => {

                    })}>
                        <TabPanel value={valueTabs} index={0} dir={theme.direction}>
                            <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Asignar DEVAS a una DUCA" />
                                    </Divider>
                                </Grid>
                                <div
                                    className="center"
                                    style={{ width: "95%", margin: "auto", marginTop: "20px" }}
                                >
                                    <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                        <label className="mt-8">Filas por página:</label>
                                        <FormControl sx={{ minWidth: 50 }} size="small">
                                            {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                                            <Select value={filasDevas} onChange={handleChangeFilasDevas}>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>20</MenuItem>
                                                <MenuItem value={30}>30</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Barra de Busqueda en la Tabla */}
                                        <TextField
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Buscar"
                                            value={searchTextDevas}
                                            onChange={handleSearchChangeDevas}
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton edge="start">
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Stack>
                                    <br />

                                    <Table
                                        locale={{
                                            triggerDesc: "Ordenar descendente",
                                            triggerAsc: "Ordenar ascendente",
                                            cancelSort: "Cancelar",
                                            emptyText: LoadingIcon(cargandoData),
                                        }}
                                        columns={columnsDevas}
                                        dataSource={filteredRowsDevas}
                                        size="small"
                                        pagination={{
                                            pageSize: filasDevas,
                                            showSizeChanger: false,
                                            className: "custom-pagination",
                                        }}
                                    />
                                </div>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right", // Alinea los botones al centro horizontalmente
                                        alignItems: "right", // Alinea verticalmente en el centro
                                    }}
                                >
                                    <Button
                                        startIcon={<Icon>arrow_forward</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={() => {
                                            GuardarDEVAS()
                                        }}
                                        disabled={loadingGuardarDevas}
                                    >
                                        {loadingGuardarDevas ? (
                                            <>
                                                {" "}Procesando...{" "}
                                            </>
                                        ) : (
                                            "Siguiente"
                                        )}
                                    </Button>

                                    <Button
                                        startIcon={<Icon>close</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: "10px" }}
                                        sx={{
                                            backgroundColor: "#DAD8D8",
                                            color: "black",
                                            "&:hover": { backgroundColor: "#BFBABA" },
                                        }}
                                        onClick={() => {
                                            navigate("/Duca/index");
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handleSubmit1((_data) => {
                        guardarTab1();
                    })}>
                        <TabPanel value={valueTabs} index={1} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '0px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Identificación de la Declaración" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.RegimenAduanero}
                                        >
                                            Regimen Aduanero:
                                        </FormLabel>
                                        <Controller
                                            name="RegimenAduanero"
                                            error={!!errors1.RegimenAduanero}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={RegimenesAduaneros}
                                                    value={datosTab1.RegimenAduanero ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("RegimenAduanero", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.RegimenAduanero}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.NoDuca}
                                        >
                                            No. de DUCA:
                                        </FormLabel>
                                        <Controller
                                            name="NoDuca"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.NoDuca}
                                                    error={!!errors1.NoDuca}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                        onBlur: () => {
                                                            validarDucaExiste();
                                                        }
                                                    }}
                                                    helperText={errors1?.NoDuca?.message.includes("required") ? "" : errors1?.NoDuca?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.NoCorrelativoReferencia}
                                        >
                                            No. Correlativo o Referencia:
                                        </FormLabel>
                                        <Controller
                                            name="NoCorrelativoReferencia"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.NoCorrelativoReferencia}
                                                    error={!!errors1.NoCorrelativoReferencia}
                                                    inputProps={{
                                                        maxLength: 14,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors1?.NoCorrelativoReferencia?.message.includes("required") ? "" : errors1?.NoCorrelativoReferencia?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.AduanaRegistro}
                                        >
                                            Aduana Registro:
                                        </FormLabel>
                                        <Controller
                                            name="AduanaRegistro"
                                            error={!!errors1.AduanaRegistro}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={Aduanas}
                                                    value={datosTab1.AduanaRegistro ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("AduanaRegistro", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.AduanaRegistro}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.AduanaDestino}
                                        >
                                            Aduana Destino:
                                        </FormLabel>
                                        <Controller
                                            name="AduanaDestino"
                                            error={!!errors1.AduanaDestino}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={Aduanas}
                                                    value={datosTab1.AduanaDestino ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("AduanaDestino", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.AduanaDestino}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="FechaVencimiento"
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl
                                                value={datosTab1.FechaVencimiento}
                                                error={!!errors1.FechaVencimiento}
                                                fullWidth={true}
                                            >
                                                <FormLabel>
                                                    Fecha de Vencimiento:
                                                </FormLabel>
                                                <DatePicker
                                                    onChange={(date) => field.onChange(date)}
                                                    value={field.value}
                                                    renderInput={(_props) => (
                                                        <TextField
                                                            {..._props}
                                                            onBlur={field.onBlur}
                                                            error={!!errors1.FechaVencimiento}
                                                            helperText={errors1?.FechaVencimiento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors1?.FechaVencimiento?.message}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.PaisProcedencia}
                                        >
                                            País de Procedencia:
                                        </FormLabel>
                                        <Controller
                                            name="PaisProcedencia"
                                            error={!!errors1.PaisProcedencia}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={PaisesProcedencia}
                                                    value={datosTab1.PaisProcedencia ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("PaisProcedencia", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.PaisProcedencia}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.PaisDestino}
                                        >
                                            País de Destino:
                                        </FormLabel>
                                        <Controller
                                            name="PaisDestino"
                                            error={!!errors1.PaisDestino}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={PaisesDestino}
                                                    value={datosTab1.PaisDestino ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("PaisDestino", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.PaisDestino}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.DepositoAduanero}
                                        >
                                            Depósito Aduanero / Zona Franca:
                                        </FormLabel>
                                        <Controller
                                            name="DepositoAduanero"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.DepositoAduanero}
                                                    error={!!errors1.DepositoAduanero}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Modalidad}
                                        >
                                            Modalidad:
                                        </FormLabel>
                                        <Controller
                                            name="Modalidad"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Modalidad}
                                                    error={!!errors1.Modalidad}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Clase}
                                        >
                                            Clase:
                                        </FormLabel>
                                        <Controller
                                            name="Clase"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Clase}
                                                    error={!!errors1.Clase}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <FormLabel
                                            error={!!errors1.LugarDesembarque}
                                        >
                                            Lugar de Desembarque:
                                        </FormLabel>
                                        <Controller
                                            name="LugarDesembarque"
                                            error={!!errors1.LugarDesembarque}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={LugarDesembarque}
                                                    value={datosTab1.LugarDesembarque ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("LugarDesembarque", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.LugarDesembarque}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={1}>
                                    <Button
                                        fullWidth={true}
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            borderRadius: "10px",
                                            marginTop: "25px"
                                        }}
                                        sx={{
                                            backgroundColor: "#DAD8D8",
                                            color: "black",
                                            "&:hover": { backgroundColor: "#BFBABA" },
                                        }}
                                        onClick={DialogLugarDesembarque}
                                    >
                                        <Icon>search</Icon>
                                    </Button>
                                </Grid>

                                

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <FormLabel
                                            error={!!errors1.trli_Id}
                                        >
                                            Ventaja:
                                        </FormLabel>
                                        <Controller
                                            name="trli_Id"
                                            error={!!errors1.trli_Id}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={ListadoVentajas}
                                                    value={datosTab1.trli_Id ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("trli_Id", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.trli_Id}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <div style={{
                                marginTop: "30px"
                            }}>
                                <Grid
                                    item
                                    xs={12}
                                    marginTop={'10px'}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "right",
                                    }}
                                >
                                    <Button
                                        id="buttonGuardarTab1"
                                        startIcon={<Icon>checked</Icon>}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            if (!isValid1) {
                                                ToastWarning();
                                            }
                                        }}
                                        style={{
                                            borderRadius: "10px",
                                            marginRight: "10px"
                                        }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        type="submit"
                                        disabled={loadingGuardarTab1}
                                    >
                                        {loadingGuardarTab1 ? (
                                            <>
                                                {" "}Guardando...{" "}
                                            </>
                                        ) : (
                                            "Guardar"
                                        )}
                                    </Button>

                                    <Button
                                        startIcon={<Icon>close</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: "10px" }}
                                        sx={{
                                            backgroundColor: "#DAD8D8",
                                            color: "black",
                                            "&:hover": { backgroundColor: "#BFBABA" },
                                        }}
                                        onClick={() => {
                                            DialogCancelarDuca();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </div>
                        </TabPanel>
                    </form>

                    <form onSubmit={handleSubmit2((_data) => {
                        guardarTab2();
                    })}>
                        <TabPanel value={valueTabs} index={2} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '0px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Declarante" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Codigo_Declarante}
                                        >
                                            Código:
                                        </FormLabel>
                                        <Controller
                                            name="Codigo_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Codigo_Declarante}
                                                    error={!!errors2.Codigo_Declarante}
                                                    inputProps={{
                                                        maxLength: 15,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.Codigo_Declarante?.message.includes("required") ? "" : errors2?.Codigo_Declarante?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.NoIdentificacion_Declarante}
                                        >
                                            No. Identificación:
                                        </FormLabel>
                                        <Controller
                                            name="NoIdentificacion_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.NoIdentificacion_Declarante}
                                                    error={!!errors2.NoIdentificacion_Declarante}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.NoIdentificacion_Declarante?.message.includes("required") ? "" : errors2?.NoIdentificacion_Declarante?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.NombreRazonSocial_Declarante}
                                        >
                                            Nombre o Razón Social:
                                        </FormLabel>
                                        <Controller
                                            name="NombreRazonSocial_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.NombreRazonSocial_Declarante}
                                                    error={!!errors2.NombreRazonSocial_Declarante}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.DomicilioFiscal_Declarante}
                                        >
                                            Domicilio Fiscal:
                                        </FormLabel>
                                        <Controller
                                            name="DomicilioFiscal_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.DomicilioFiscal_Declarante}
                                                    error={!!errors2.DomicilioFiscal_Declarante}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Transportista" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Codigo}
                                        >
                                            Código:
                                        </FormLabel>
                                        <Controller
                                            name="Codigo"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Codigo}
                                                    error={!!errors2.Codigo}
                                                    inputProps={{
                                                        maxLength: 5,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.Codigo?.message.includes("required") ? "" : errors2?.Codigo?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Nombre}
                                        >
                                            Nombre:
                                        </FormLabel>
                                        <Controller
                                            name="Nombre"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Nombre}
                                                    error={!!errors2.Nombre}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.ModoTransporte}
                                        >
                                            Modo de Transporte:
                                        </FormLabel>
                                        <Controller
                                            name="ModoTransporte"
                                            error={!!errors2.ModoTransporte}
                                            control={control2}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={ModosTransporte}
                                                    value={datosTab2.ModoTransporte ?? null}
                                                    onChange={(event, value) => {
                                                        setValues2("ModoTransporte", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors2.ModoTransporte}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginTop: "30px" }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={5}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked={CollapseConductor}
                                                    onClick={() => {
                                                        setCollapseConductor(!CollapseConductor);
                                                    }}
                                                />
                                            }
                                            label="¿Desea llenar los campos de Conductor?"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>

                            <Collapse in={CollapseConductor}>
                                <Grid item xs={12}>
                                    <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                        <Chip color='default' label="Conductor" />
                                    </Divider>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NoIdentificador}
                                            >
                                                No. Identificación:
                                            </FormLabel>
                                            <Controller
                                                name="NoIdentificador"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NoIdentificador}
                                                        error={!!errors2.NoIdentificador}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                        helperText={errors2?.NoIdentificador?.message.includes("required") ? "" : errors2?.NoIdentificador?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NoLicenciaConducir}
                                            >
                                                No. Licencia de Conducir:
                                            </FormLabel>
                                            <Controller
                                                name="NoLicenciaConducir"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NoLicenciaConducir}
                                                        error={!!errors2.NoLicenciaConducir}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                        helperText={errors2?.NoLicenciaConducir?.message.includes("required") ? "" : errors2?.NoLicenciaConducir?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <FormLabel
                                                error={!!errors2.PaisExpedicion}
                                            >
                                                País Expedición:
                                            </FormLabel>
                                            <Controller
                                                name="PaisExpedicion"
                                                error={!!errors2.PaisExpedicion}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab2.PaisExpedicion ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("PaisExpedicion", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.PaisExpedicion}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Nombres}
                                            >
                                                Nombres:
                                            </FormLabel>
                                            <Controller
                                                name="Nombres"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Nombres}
                                                        error={!!errors2.Nombres}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Apellidos}
                                            >
                                                Apellidos:
                                            </FormLabel>
                                            <Controller
                                                name="Apellidos"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Apellidos}
                                                        error={!!errors2.Apellidos}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.IdUnidadTransporte}
                                            >
                                                Id Unidad Transporte:
                                            </FormLabel>
                                            <Controller
                                                name="IdUnidadTransporte"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.IdUnidadTransporte}
                                                        error={!!errors2.IdUnidadTransporte}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <FormLabel
                                                error={!!errors2.PaisRegistro}
                                            >
                                                País de Registro:
                                            </FormLabel>
                                            <Controller
                                                name="PaisRegistro"
                                                error={!!errors2.PaisRegistro}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab2.PaisRegistro ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("PaisRegistro", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.PaisRegistro}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Marca}
                                            >
                                                Marca:
                                            </FormLabel>
                                            <Controller
                                                name="Marca"
                                                error={!!errors2.Marca}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Marcas}
                                                        value={datosTab2.Marca ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("Marca", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.Marca}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.ChasisVin}
                                            >
                                                Chasis / Vin:
                                            </FormLabel>
                                            <Controller
                                                name="ChasisVin"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.ChasisVin}
                                                        error={!!errors2.ChasisVin}
                                                        inputProps={{
                                                            maxLength: 17,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.IdentificacionRemolque}
                                            >
                                                Identificación del Remolque...
                                                <BootstrapTooltip
                                                    title="o Semirremolque"
                                                    style={{ height: "18px" }}
                                                >
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="IdentificacionRemolque"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.IdentificacionRemolque}
                                                        error={!!errors2.IdentificacionRemolque}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.CantidadUnidadesCarga}
                                            >
                                                Cantidad de Unidades Carga...
                                                <BootstrapTooltip
                                                    title="(remolque y semirremolque)"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="CantidadUnidadesCarga"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.CantidadUnidadesCarga}
                                                        error={!!errors2.CantidadUnidadesCarga}
                                                        inputProps={{
                                                            maxLength: 5,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NumeroDispositivo}
                                            >
                                                Número de Dispositivo Seguridad...
                                                <BootstrapTooltip
                                                    title="(precintos o marchamos)"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="NumeroDispositivo"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NumeroDispositivo}
                                                        error={!!errors2.NumeroDispositivo}
                                                        inputProps={{
                                                            maxLength: 3,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Equipamiento}
                                            >
                                                Equipamiento:
                                            </FormLabel>
                                            <Controller
                                                name="Equipamiento"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Equipamiento}
                                                        error={!!errors2.Equipamiento}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.TamanioEquipamiento}
                                            >
                                                Tamaño del equipamiento:
                                            </FormLabel>
                                            <Controller
                                                name="TamanioEquipamiento"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.TamanioEquipamiento}
                                                        error={!!errors2.TamanioEquipamiento}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.TipoCarga}
                                            >
                                                Tipo de Carga:
                                            </FormLabel>
                                            <Controller
                                                name="TipoCarga"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.TipoCarga}
                                                        error={!!errors2.TipoCarga}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NIdentificacionContenedor}
                                            >
                                                Número o Números de Identificación...
                                                <BootstrapTooltip
                                                    title="del o de los Contenedores"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="NIdentificacionContenedor"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NIdentificacionContenedor}
                                                        error={!!errors2.NIdentificacionContenedor}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Collapse>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right"
                                }}
                            >
                                <Button
                                    id="buttonGuardarTab2"
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (!isValid2) {
                                            ToastWarning();
                                        }
                                    }}
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    disabled={loadingGuardarTab2}
                                >
                                    {loadingGuardarTab2 ? (
                                        <>
                                            {" "}Guardando...{" "}
                                        </>
                                    ) : (
                                        "Guardar"
                                    )}
                                </Button>

                                <Button
                                    startIcon={<Icon>close</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px" }}
                                    sx={{
                                        backgroundColor: "#DAD8D8",
                                        color: "black",
                                        "&:hover": { backgroundColor: "#BFBABA" },
                                    }}
                                    onClick={() => {
                                        DialogCancelarDuca();
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </TabPanel>
                    </form>

                    <TabPanel value={valueTabs} index={3} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Divider style={{ marginTop: '0px', marginBottom: '20px' }}>
                                <Chip color='default' label="Mercancias" />
                            </Divider>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                <label className='mt-8'>Filas por página:</label>
                                <FormControl sx={{ minWidth: 50 }} size="small">
                                    <Select
                                        value={filasItems}
                                        onChange={handleChangeFilasItems}
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Barra de Busqueda en la Tabla */}
                                <TextField
                                    style={{ borderRadius: '10px' }}
                                    placeholder='Buscar'
                                    value={searchTextItems}
                                    onChange={handleSearchChangeItems}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton edge="start">
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                                <Table
                                    locale={{
                                        triggerDesc: 'Ordenar descendente',
                                        triggerAsc: 'Ordenar ascendente',
                                        cancelSort: 'Cancelar',
                                        emptyText: LoadingIcon(),
                                    }}
                                    columns={columnsItems}
                                    dataSource={filteredRowsItems}
                                    size="small"
                                    pagination={{
                                        pageSize: filasItems,
                                        showSizeChanger: false,
                                        className: "custom-pagination",
                                    }}
                                />
                            </div>
                        </Grid>

                        <form onSubmit={handleSubmit3_Items((_data) => {
                            guardarTab3_Items();
                        })}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Item_Id}
                                        >
                                            Id Item:
                                        </FormLabel>
                                        <Controller
                                            name="Item_Id"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={true}
                                                    value={datosTab3_Items.Item_Id}
                                                    error={!!errors3_Items.Item_Id}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CantidadBultos}
                                        >
                                            Cantidad Bultos:
                                        </FormLabel>
                                        <Controller
                                            name="CantidadBultos"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CantidadBultos}
                                                    error={!!errors3_Items.CantidadBultos}
                                                    inputProps={{
                                                        maxLength: 3,
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors3_Items?.CantidadBultos?.message.includes("required") ? "" : errors3_Items?.CantidadBultos?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.ClaseBulto}
                                        >
                                            Clase de Bultos:
                                        </FormLabel>
                                        <Controller
                                            name="ClaseBulto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.ClaseBulto}
                                                    error={!!errors3_Items.ClaseBulto}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.PesoNeto}
                                        >
                                            Peso Neto:
                                        </FormLabel>
                                        <Controller
                                            name="PesoNeto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.PesoNeto}
                                                    error={!!errors3_Items.PesoNeto}
                                                    inputProps={{
                                                        maxLength: 12
                                                    }}
                                                    helperText={errors3_Items?.PesoNeto?.message.includes("required") ? "" : errors3_Items?.PesoNeto?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.PesoBruto}
                                        >
                                            Peso Bruto:
                                        </FormLabel>
                                        <Controller
                                            name="PesoBruto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.PesoBruto}
                                                    error={!!errors3_Items.PesoBruto}
                                                    inputProps={{
                                                        maxLength: 12
                                                    }}
                                                    helperText={errors3_Items?.PesoBruto?.message.includes("required") ? "" : errors3_Items?.PesoBruto?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CuotaContingente}
                                        >
                                            Cuota Contingente:
                                        </FormLabel>
                                        <Controller
                                            name="CuotaContingente"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CuotaContingente}
                                                    error={!!errors3_Items.CuotaContingente}
                                                    helperText={errors3_Items?.CuotaContingente?.message.includes("required") ? "" : errors3_Items?.CuotaContingente?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Acuerdo}
                                        >
                                            Acuerdo:
                                        </FormLabel>
                                        <Controller
                                            name="Acuerdo"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.Acuerdo}
                                                    error={!!errors3_Items.Acuerdo}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CriterioParaOrigen}
                                        >
                                            Criterio Para Certificar Origen:
                                        </FormLabel>
                                        <Controller
                                            name="CriterioParaOrigen"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CriterioParaOrigen}
                                                    error={!!errors3_Items.CriterioParaOrigen}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.ReglasAccesorias}
                                        >
                                            Reglas Accesorias:
                                        </FormLabel>
                                        <Controller
                                            name="ReglasAccesorias"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.ReglasAccesorias}
                                                    error={!!errors3_Items.ReglasAccesorias}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.GastosTransporte}
                                        >
                                            Gastos de Transporte:
                                        </FormLabel>
                                        <Controller
                                            name="GastosTransporte"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.GastosTransporte}
                                                    error={!!errors3_Items.GastosTransporte}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.GastosTransporte?.message.includes("required") ? "" : errors3_Items?.GastosTransporte?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Seguro}
                                        >
                                            Seguro:
                                        </FormLabel>
                                        <Controller
                                            name="Seguro"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.Seguro}
                                                    error={!!errors3_Items.Seguro}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.Seguro?.message.includes("required") ? "" : errors3_Items?.Seguro?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.OtrosGastos}
                                        >
                                            Otros Gastos:
                                        </FormLabel>
                                        <Controller
                                            name="OtrosGastos"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.OtrosGastos}
                                                    error={!!errors3_Items.OtrosGastos}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.OtrosGastos?.message.includes("required") ? "" : errors3_Items?.OtrosGastos?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                </Grid>

                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        disabled={completarItem}
                                        startIcon={<Icon>{isEditItem ? "edit" : "add"}</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            borderRadius: "10px",
                                            marginRight: "10px",
                                            marginTop: "20px"
                                        }}
                                        sx={{
                                            backgroundColor: "#D1AF3C",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#EACB60" },
                                        }}
                                        onClick={() => {
                                            if (!isValid3_Items) {
                                                ToastWarning();
                                            }
                                        }}
                                        type="submit"
                                    >
                                        {isEditItem ? "Editar Mercancía" : "Completar Mercancía"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <br />
                        <br />
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                <label className='mt-8'>Filas por página:</label>
                                <FormControl sx={{ minWidth: 50 }} size="small">
                                    <Select
                                        value={filasItemsCompletados}
                                        onChange={handleChangeFilasItemsCompletados}
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Barra de Busqueda en la Tabla */}
                                <TextField
                                    style={{ borderRadius: '10px' }}
                                    placeholder='Buscar'
                                    value={searchTextItemsCompletados}
                                    onChange={handleSearchChangeItemsCompletados}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton edge="start">
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
                                <Table
                                    locale={{
                                        triggerDesc: 'Ordenar descendente',
                                        triggerAsc: 'Ordenar ascendente',
                                        cancelSort: 'Cancelar',
                                        emptyText: LoadingIcon(),
                                    }}
                                    columns={columnsItemsCompletados}
                                    dataSource={filteredRowsItemsCompletados}
                                    size="small"
                                    pagination={{
                                        pageSize: filasItemsCompletados,
                                        showSizeChanger: false,
                                        className: "custom-pagination",
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid container spacing={2} style={{ marginTop: "30px" }}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={5}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={documentosSoporteList.length > 0}
                                                onClick={() => {
                                                    setCollapseDocumentosSoport(!collapseDocumentosSoporte);

                                                    if (!collapseDocumentosSoporte) {
                                                        setIsEditDocumentoSoporte(false);
                                                    }
                                                }}
                                            />
                                        }
                                        label="¿Desea agegar Documentos de Soporte?"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Collapse in={collapseDocumentosSoporte}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Documentos de Soporte" />
                                </Divider>
                            </Grid>

                            <form onSubmit={handleSubmit3_DocumentosSoporte((_data) => {
                                guardarTab3_DocumentosSoporte();
                            })}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                            >
                                                Código del Tipo Documento:
                                            </FormLabel>
                                            <Controller
                                                name="CodigoTipoDocumento"
                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={tiposDocumentos}
                                                        value={datosTab3_DocumentosSoporte.CodigoTipoDocumento ?? null}
                                                        onChange={(event, value) => {
                                                            setValues3_DocumentosSoporte("CodigoTipoDocumento", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.NumeroDocumento}
                                            >
                                                Número de Documento:
                                            </FormLabel>
                                            <Controller
                                                name="NumeroDocumento"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.NumeroDocumento}
                                                        error={!!errors3_DocumentosSoporte.NumeroDocumento}
                                                        inputProps={{
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                        }}
                                                        helperText={errors3_DocumentosSoporte?.NumeroDocumento?.message.includes("required") ? "" : errors3_DocumentosSoporte?.NumeroDocumento?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Controller
                                            name="EmisionDocumento"
                                            control={control3_DocumentosSoporte}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors3_DocumentosSoporte.EmisionDocumento}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha Emisión del Documento:
                                                    </FormLabel>
                                                    <DatePicker
                                                        onChange={(date) => field.onChange(date)}
                                                        value={field.value}
                                                        disableFuture={true}
                                                        renderInput={(_props) => (
                                                            <TextField
                                                                {..._props}
                                                                onBlur={field.onBlur}
                                                                error={!!errors3_DocumentosSoporte.EmisionDocumento}
                                                                helperText={errors3_DocumentosSoporte?.EmisionDocumento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors3_DocumentosSoporte?.EmisionDocumento?.message}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Controller
                                            name="FechaVencimiento"
                                            control={control3_DocumentosSoporte}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors3_DocumentosSoporte.FechaVencimiento}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha Vencimiento del Documento:
                                                    </FormLabel>
                                                    <DatePicker
                                                        onChange={(date) => field.onChange(date)}
                                                        value={field.value}
                                                        disablePast={true}
                                                        renderInput={(_props) => (
                                                            <TextField
                                                                {..._props}
                                                                onBlur={field.onBlur}
                                                                error={!!errors3_DocumentosSoporte.FechaVencimiento}
                                                                helperText={errors3_DocumentosSoporte?.FechaVencimiento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors3_DocumentosSoporte?.FechaVencimiento?.message}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                            >
                                                País de Emisión:
                                            </FormLabel>
                                            <Controller
                                                name="PaisEmision"
                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab3_DocumentosSoporte.PaisEmision ?? null}
                                                        onChange={(event, value) => {
                                                            setValues3_DocumentosSoporte("PaisEmision", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.Linea}
                                            >
                                                Linea (al que aplica el documento):
                                            </FormLabel>
                                            <Controller
                                                name="Linea"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.Linea}
                                                        error={!!errors3_DocumentosSoporte.Linea}
                                                        inputProps={{
                                                            maxLength: 4,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.AutoridadEntidad}
                                            >
                                                Autoridad o Entidad que Emitió...
                                                <BootstrapTooltip
                                                    title="el Documento"
                                                    style={{ height: "18px" }}
                                                >
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="AutoridadEntidad"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.AutoridadEntidad}
                                                        error={!!errors3_DocumentosSoporte.AutoridadEntidad}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.Monto}
                                            >
                                                Monto:
                                            </FormLabel>
                                            <Controller
                                                name="Monto"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.Monto}
                                                        error={!!errors3_DocumentosSoporte.Monto}
                                                        inputProps={{
                                                            maxLength: 10,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} >
                                        <Button
                                            fullWidth
                                            startIcon={<Icon>{isEditDocumentoSoporte ? "edit" : "add"}</Icon>}
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                borderRadius: "10px",
                                                marginRight: "10px",
                                                marginTop: "25px"
                                            }}
                                            sx={{
                                                backgroundColor: "#D1AF3C",
                                                color: "white",
                                                "&:hover": { backgroundColor: "#EACB60" },
                                            }}
                                            onClick={() => {
                                                if (!isValid3_DocumentosSoporte) {
                                                    ToastWarning();
                                                }
                                            }}
                                            type="submit"
                                        >
                                            {isEditDocumentoSoporte ? "Editar Documento" : "Agregar Documento"}
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
                                            <Table
                                                locale={{
                                                    triggerDesc: 'Ordenar descendente',
                                                    triggerAsc: 'Ordenar ascendente',
                                                    cancelSort: 'Cancelar',
                                                    emptyText: LoadingIcon(),
                                                }}
                                                columns={columnsDocumentos}
                                                dataSource={documentosSoporteList}
                                                size="small"
                                                pagination={{
                                                    pageSize: 10,
                                                    showSizeChanger: false,
                                                    className: "custom-pagination",
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </Collapse>

                        <Grid container spacing={2} my={'15px'}>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (ListadoItems.length > 0) {
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que esta contiene Items sin completar!")
                                        } else if (ListadoItemsCompletados.length == 0) {
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que esta no contiene Items!")
                                        } else if (datosTab1.NoDuca === null || datosTab1.NoDuca === ""){
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que el campo 'No. de DUCA' está vacío.!")
                                        } else {
                                            setFinalizacionDuca(true);
                                        }
                                    }}
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                >
                                    Finalizar DUCA
                                </Button>

                                <Button
                                    startIcon={<Icon>close</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px" }}
                                    sx={{
                                        backgroundColor: "#DAD8D8",
                                        color: "black",
                                        "&:hover": { backgroundColor: "#BFBABA" },
                                    }}
                                    onClick={(e) => {
                                        DialogCancelarDuca();
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>

                </SwipeableViews>
            </Box>

            <Dialog
                open={LugarDesembarqueOpenDialog}
                fullWidth={true}
                onClose={DialogLugarDesembarque}
                maxWidth={"md"}
            >
                <DialogTitle id="alert-dialog-title">
                    Lugares de Desembarque
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        DialogLugarDesembarque()
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Grid container spacing={2} style={{ marginBottom: "15px" }}>
                        <Grid item xs={8}>
                            <TextField
                                placeholder="Buscar"
                                size="xs"
                                fullWidth={true}
                                value={TextLugarDesembarque}
                                inputProps={{
                                    style: {
                                        textTransform: "uppercase"
                                    }
                                }}
                                onChange={handleChangeLugarDesembarque}
                            ></TextField>
                        </Grid>
                        <Grid item xs={4} >
                            <Button
                                fullWidth={true}
                                startIcon={<Icon>search</Icon>}
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: "10px",
                                    marginTop: "6px"
                                }}
                                sx={{
                                    backgroundColor: '#634A9E',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#6e52ae' },
                                }}
                                onClick={EnviarData}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    {/* Declaracion de la tabla */}
                    <div className="center" style={{ width: "95%", margin: "auto" }}>
                        <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                            <label className="mt-8">Filas por página:</label>
                            <FormControl sx={{ minWidth: 50 }} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={filasLugarDesembarque}
                                    onChange={handleChangeFilasLugarDesembarque}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Barra de Busqueda en la Tabla */}
                            <TextField
                                style={{ borderRadius: "10px" }}
                                placeholder="Buscar"
                                value={SearchTextLugarDesembarque}
                                onChange={handleSearchChangeLugarDesembarque}
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <br />
                        <Table
                            columns={columnsLugarDesembarque}
                            dataSource={filteredRowsLugarDesembarque}
                            size="sm"
                            locale={{
                                triggerDesc: "Ordenar descendente",
                                triggerAsc: "Ordenar ascendente",
                                cancelSort: "Cancelar",
                                emptyText: LoadingIcon(),
                            }}
                            pagination={{
                                pageSize: filasLugarDesembarque,
                                showSizeChanger: false,
                                className: "custom-pagination",
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<Icon>close</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "10px" }}
                        sx={{
                            backgroundColor: "#DAD8D8",
                            color: "black",
                            "&:hover": { backgroundColor: "#BFBABA" },
                        }}
                        onClick={() => {
                            DialogLugarDesembarque()
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Inicia del Dialog(Modal) de Finalización */}
            <Dialog
                open={finalizacionDuca}
                fullWidth
                onClose={DialogFinalizarDuca}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmación de Finalización
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        DialogFinalizarDuca();
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro(a) de que desea finalizar la DUCA? <br></br>
                        Le recordamos que una vez que la DUCA sea finalizada,
                        no será posible realizar modificaciones a la misma.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                        }}
                    >
                        <Button
                            startIcon={<Icon>checked</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "10px", marginRight: "10px" }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            onClick={() => {
                                finalizarDuca();
                            }}
                            disabled={loadingFinalizarDuca}
                        >
                            {loadingFinalizarDuca ? (
                                <>
                                    {" "}Finalizando...{" "}
                                </>
                            ) : (
                                "Finalizar"
                            )}
                        </Button>

                        <Button
                            startIcon={<Icon>close</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "10px" }}
                            sx={{
                                backgroundColor: "#DAD8D8",
                                color: "black",
                                "&:hover": { backgroundColor: "#BFBABA" },
                            }}
                            onClick={DialogFinalizarDuca}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Dialog
                open={cancelarDuca}
                fullWidth={true}
                onClose={DialogCancelarDuca}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ¿Desea cancelar la creación de esta DUCA?
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        DialogCancelarDuca();
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        —Si presiona en "Cancelar sin guardar"; el registro actual se eliminará y no se guardará ningún cambio.
                        <br /><br />
                        —Si presiona en "Guardar y Salir"; deberá llenar correctamente los campos para poder guardar la DUCA, luego será redirijido(a) al Index.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                        }}
                    >
                        <Button
                            startIcon={<Icon>checked</Icon>}
                            variant="contained"
                            color={"primary"}
                            style={{ borderRadius: '10px', marginRight: '10px' }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            onClick={() => {
                                GuardarYSalir();
                            }}
                        >
                            Guardar y Salir
                        </Button>
                        <Button
                            startIcon={<Icon>close</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: '10px', marginRight: '10px' }}
                            sx={{
                                backgroundColor: "#DAD8D8",
                                color: "black",
                                "&:hover": { backgroundColor: "#BFBABA" },
                            }}
                            onClick={() => {
                                CancelarNoGuardar();
                            }}
                            disabled={loadingCancelarDuca}
                        >
                            {loadingCancelarDuca ? (
                                <>
                                    {" "}Cancelando...{" "}
                                </>
                            ) : (
                                "Cancelar sin Guardar"
                            )}
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Card>